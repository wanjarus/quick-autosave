var autosave = {
	config : {
		action : {},
		pointer : {},
		success : {},
		fail : {},
		before : {}
	},
	init : function (parameter, func) {
		if (!window.jQuery) {
			console.error(
				"autosave.js : cannot be loaded.\n" +
				"Please include jQuery configuration."
			);

			return;
		}

		if (func != null) {
			if (typeof func !== "object" || parameter == "")
				return;
		}
		else {
			func = {};
		}

		if ($.isArray(parameter)) {
			for (var i = 0; i < parameter.length; i++) {
				if (typeof parameter[i] == "string")
					autosave.search(parameter[i], func);
				else if (typeof parameter[i].pointer == "string")
					autosave.search(parameter[i].pointer, parameter[i]);
			}
		}
		else if (typeof parameter == "object" && parameter !== null) {
			if(typeof parameter.pointer == "string")
				autosave.search(parameter.pointer, parameter);
		}
		else if(typeof parameter == "string"){
			autosave.search(parameter, func);
		}
	},
	search : function (pointer, parameter) {
		var target = $(pointer);
		if (target.length == 0) {
			console.error(pointer + " cannot be found.");
			return;
		}

		for (var i = 0; i < target.length; i++) {
			autosave.load($(target[i]), parameter);
		}
	},
	generate : function(list) {
		var text = "";
		var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 3; i++)
			text += char.charAt(Math.floor(Math.random() * char.length));

		return list == null || list[text] == undefined ? text : autosave.generate(list);
	},
	getToken : function(type, element) {
		var pointer = autosave.config.pointer;
		var before = autosave.config.before;
		var success = autosave.config.success;
		var fail = autosave.config.fail;
		var action = autosave.config.action;
		var token;
		var list;

		if (type == "pointer") {
			list = pointer;
			for (var i in pointer) {
				if (pointer[i].parent == element)
					return i;
			}
		}
		else if (type == "before") {
			list = before;
			for (var i in before) {
				if (before[i] == element)
					return i;
			}
		}
		else if (type == "success") {
			list = success;
			for (var i in success) {
				if (success[i] == element)
					return i;
			}
		}
		else if (type == "fail") {
			list = fail;
			for (var i in fail) {
				if (fail[i] == element)
					return i;
			}
		}
		else if (type == "action") {
			list = action;
			for (var i in action) {
				if (action[i] == element)
					return i;
			}
		}

		token = autosave.generate(list);
		if (type == "pointer")
			autosave.config.pointer[token] = {
				parent : element,
				child : []
			};
		else if (type == "before")
			autosave.config.before[token] = element;
		else if (type == "success")
			autosave.config.success[token] = element;
		else if (type == "fail")
			autosave.config.fail[token] = element;
		else if (type == "action")
			autosave.config.action[token] = element;

		return token;
	},
	isExist : function(element) {
		return element != null && element != undefined;
	},
	getConfig : function(target, parameter) {
		var data = {};

		if(autosave.isExist(target))
			data.pointer = autosave.getToken("pointer", target);
		if(autosave.isExist(parameter.before))
			data.before = autosave.getToken("before", parameter.before);
		if(autosave.isExist(parameter.success))
			data.success = autosave.getToken("success", parameter.success);
		if(autosave.isExist(parameter.fail))
			data.fail = autosave.getToken("fail", parameter.fail);
		if(autosave.isExist(parameter.action))
			data.action = autosave.getToken("action", parameter.action);

		return data;
	},
	create : function (parameter) {
		var target = parameter.target;
		var tag = parameter.tag;
		var cache = parameter.config;
		var data = autosave.getInfo(target, tag);

		cache.value = data.value;
		cache = JSON.stringify(cache);

		target.attr("data-autosave-cache", cache);
		target.on(data.event, autosave.save);
	},
	load : function (target, parameter) {
		var action = "";
		var config = {};
		var tag = target.prop("tagName").toLowerCase();
		var child = target.children();

		if (!(action = target.attr("data-autosave-action")) || action == "")
			return;

		parameter.action = action;

		if (child.length == 0) {
			if (autosave.valid(target, tag)) {
				var config = autosave.getConfig(target, parameter);
				var token = config.pointer;

				if (target.attr("data-autosave-cache") == undefined) {
					autosave.config.pointer[token].child.push(target);
					autosave.create({
						target : target,
						config : config,
						tag : tag
					});
				}
			}
		}
		else {
			target.find('*').each(function(){
				var element = $(this);
				tag = element.prop("tagName").toLowerCase();
				if (autosave.valid(element, tag)) {
					var action = element.attr("data-autosave-action");
					var data = parameter;

					data.action = (action == undefined ? data.action : action);
					var config = autosave.getConfig(target, data);
					var token = config.pointer;

					if (element.attr("data-autosave-cache") == undefined) {
						autosave.config.pointer[token].child.push(element);
						autosave.create({
							target : element,
							config : config,
							tag : tag
						});
					}
				}
		 	});
		}
	},
	valid : function (element, tag) {
		if (element.attr("data-autosave-name") && (element.attr("contentEditable") == "true" ||
	       tag == "input" || tag == "checkbox" || tag == "radio" ||
		    tag == "textarea"))
			return true;
	},
	getInfo : function(element, tag) {
		var type = element.attr("type");
		var parameter = {
			event : "",
			value : ""
		};

		if (type == 'checkbox' || type == 'radio') {
			parameter.value = element.is(':checked');
			parameter.event = "change";
		}
		else if (tag == "input" || tag == "textarea") {
			parameter.value = element.val();
			parameter.event = "blur";
		}
		else if (tag == 'select') {
			parameter.value = element.val();
			parameter.event = "change";
		}
		else {
			parameter.value = element.html();
			parameter.event = "blur";
		}

		return parameter;
	},
	getvaluelist : function(name, parent) {
		var child = autosave.config.pointer[parent].child;
		var value = "";

		if (child.length == 0)
			return $("." + parent).val();

		for (var i = 0; i < child.length; i++) {
			if (child[i].attr("data-autosave-name") == name) {
				if (child[i].is(':checked'))
					value += child[i].val() + '&';
			}
		}

		if(value.length > 0)
         value = value.substring(0, value.length - 1);

		return value;
	},
	getByGroup : function(name, parent, parameter, group) {
		var list = group.replace(/\s/g,'').split(',');
		var child = autosave.config.pointer[parent].child;

		for (var i = 0; i < child.length; i++) {
			for (var j = 0; j < list.length; j++) {
				if (child[i].attr("data-autosave-name") == list[j]) {
					var name = list[j];
					var element = child[i];
					var tag = element.prop("tagName").toLowerCase();
					var type = element.attr("type");
					var data = autosave.getInfo(element, tag);
					var value = data.value;

					if (type == 'checkbox' || type == 'radio')
						value = autosave.getvaluelist(name, parent);

					parameter[name] = value;

				}
			}
		}

		return parameter;
	},
	setfalse : function(name, parent) {
		var child = autosave.config.pointer[parent].child;

		if (child.length == 0)
			return;

		for (var i = 0; i < child.length; i++) {
			if (child[i].attr("data-autosave-name") == name) {
				var data = JSON.parse(child[i].attr("data-autosave-cache"));
				data.value = false;
				data = JSON.stringify(data);

				child[i].attr('data-autosave-cache', data);
			}
		}
	},
	save : function(event) {
		var target = $(this);
		var name = target.attr("data-autosave-name");
		var group = target.attr("data-autosave-group");
		var config = JSON.parse(target.attr("data-autosave-cache"));
		var type = target.attr("type");
		var tag = target.prop("tagName").toLowerCase();
		var info = autosave.getInfo(target, tag);
		var parent = config.pointer;

		if (info.value !== config.value) {
			var value = info.value;
			var before = autosave.config.before;
			var success = autosave.config.success;
			var fail = autosave.config.fail;
			var action = autosave.config.action[config.action];
			var data = {};

			if (type == 'checkbox' || type == 'radio')
				value = autosave.getvaluelist(name, parent);

			data[name] = value;

			if (group != undefined)
				data = autosave.getByGroup(name, parent, data, group);

			if (config.before == undefined || before[config.before](data) == true) {
				config.value = value;
				cache = JSON.stringify(config);

				$.ajax({
					method : "POST",
					url : action,
					data : data
				})
				.done(function(data) {
					if (type == 'radio')
						autosave.setfalse(name, parent);

					if(config.success != undefined)
						success[config.success](data, target);

					target.attr('data-autosave-cache', cache);
				})
				.fail(function() {
					if(config.fail != undefined)
						fail[config.fail](target);
				});
			}
		}
	},
};
