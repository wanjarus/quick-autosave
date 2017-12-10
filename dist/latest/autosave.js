var autosave = {
	config : {
		action : {},
		pointer : {},
		success : {},
		fail : {},
		before : {}
	},
	load : function (target, parameter) {
		var target = $(target);
		var tag    = target.prop("tagName").toLowerCase();
		var action = "";

		if (!(action = target.attr(tag == "form" ? "action" : "data-action")) || action == "")
			return;

		parameter.action = action;

		if (target.children().length == 0) {
			var tag = target.prop("tagName").toLowerCase();
			if (autosave.valid(target, tag)) {
				var overwrite = target.attr("data-action");
				var config = parameter;
				var token;

				config.pointer = target;
				config.action = action;
				config = autosave.getConfig(config);
				token = config.pointer;

				if (target.attr("data-cache") == undefined) {
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
				var tag = element.prop("tagName").toLowerCase();
				if (autosave.valid(element, tag)) {
					var overwrite = element.attr("data-action");
					var config = parameter;
					var token;

					config.pointer = target;
					config.action = (overwrite == undefined ? action : overwrite);
					config = autosave.getConfig(config);
					token = config.pointer;

					if (element.attr("data-cache") == undefined) {
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
	create : function (parameter) {
		var target = parameter.target;
		var tag = parameter.tag;
		var cache = parameter.config;
		var data = autosave.getInfo(target, tag);
		var name = target.attr("name") == undefined ? target.attr("data-name") : target.attr("name");

		cache.value = data.value;
		cache.name = name;
		cache = JSON.stringify(cache);

		target.attr("data-cache", cache);
		target.on(data.event, function(event){
			var element = $(this);
			var config = JSON.parse(element.attr("data-cache"));
			autosave.save(element, config);
		});
	},
	getInfo : function(element, tag) {
		var type = element.attr("type");
		var data = {};

		if (type == 'checkbox' || type == 'radio') {
			data.value = element.is(':checked');
			data.event = "change";
		}
		else if (tag == "input" || tag == "textarea") {
			data.value = element.val();
			data.event = "blur";
		}
		else if (tag == 'select') {
			data.value = element.val();
			data.event = "change";
		}
		else {
			data.value = element.html();
			data.event = "blur";
		}

		return data;
	},
	getConfig : function (parameter) {
		var list = [ "pointer", "before", "success", "fail", "action" ];
		var data = {};

		for (var i = 0; i < list.length; i++) {
			var key = list[i];
			if(autosave.isExist(parameter[key]))
				data[key] = autosave.getToken(key, parameter[key]);
		}

		return data;
	},
	getToken : function (type, element) {
		var list = (type == "pointer" ? autosave.config[type].parent : autosave.config[type]);

		for (var i in autosave.config[type]) {
			if (autosave.config[type][i] == element)
				return i;
			else if (type == "pointer" && autosave.config[type][i].parent == element)
				return i;
		}

		token = autosave.generate(list);
		if (type == "pointer") {
			autosave.config[type][token] = {
				parent : element,
				child : []
			};
		}
		else {
			autosave.config[type][token] = element;
		}

		return token;
	},
	isExist : function (element) {
		return element != null && element != undefined;
	},
	generate : function (list) {
		var text = "";
		var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 3; i++)
			text += char.charAt(Math.floor(Math.random() * char.length));

		return list == null || list[text] == undefined ? text : autosave.generate(list);
	},
	valid : function (element, tag) {
		if ((element.attr("name") || element.attr("data-name")) &&
			(element.attr("contentEditable") == "true" || tag == "input" ||
			tag == "checkbox" || tag == "radio" || tag == "textarea" || tag == "select"))
			return true;
	},
	getvaluelist : function(name, parent) {
		var child = autosave.config.pointer[parent].child;
		var value = "";

		if (child.length == 0)
			return $("." + parent).val();

		for (var i = 0; i < child.length; i++) {
			if (child[i].attr("data-name") == name || child[i].attr("name") == name) {
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
				if (child[i].attr("data-name") == list[j] || child[i].attr("name") == list[j]) {
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
			if (child[i].attr("data-name") == name || child[i].attr("name") == name) {
				var data = JSON.parse(child[i].attr("data-cache"));
				data.value = false;
				data = JSON.stringify(data);

				child[i].attr('data-cache', data);
			}
		}
	},
	retry : function(link, target) {
		var config = JSON.parse(link.attr("data-cache"));
		autosave.save(target, config, true);
	},
	save : function(target, config, retry) {
		var name = config.name;
		var group = target.attr("data-group");
		var type = target.attr("type");
		var tag = target.prop("tagName").toLowerCase();
		var info = autosave.getInfo(target, tag);
		var parent = config.pointer;

		if (info.value !== config.value || retry) {
			var value = info.value;
			var action = autosave.config.action[config.action];
			var data = {};
			var parameter = {};
			var func = {
				before : autosave.config.before,
				success : autosave.config.success,
				fail : autosave.config.fail
			};

			if (type == 'checkbox' || type == 'radio')
				value = autosave.getvaluelist(name, parent);

			data[name] = value;

			if (group != undefined)
				data = autosave.getByGroup(name, parent, data, group);

			parameter.action = action;
			parameter.data = data;
			parameter.target = target;

			if (config.before == undefined || func.before[config.before](parameter) == true) {
				config.value = info.value;
				cache = JSON.stringify(config);

				var retry = function(element) {
					element.html("Your changes could not be saved. <a href=\"#\">Try again</a>");
					var link = element.find("a");

					link.attr("data-cache", cache);
					link.on("click", function(event){
						event.preventDefault();
						autosave.retry($(this), target)
					});
				};

				parameter.before = config.value;
				parameter.retry = retry;

				$.ajax({
					method : "POST",
					url : action,
					data : data
				})
				.done(function(data) {
					if (type == 'radio')
						autosave.setfalse(name, parent);

					if (config.success != undefined)
						func.success[config.success](data, parameter);

					target.attr('data-cache', cache);
				})
				.fail(function() {
					if (config.fail != undefined)
						func.fail[config.fail](parameter);
				});
			}
		}
	}
};

(function($) {
	$.fn.autosave = function (parameter) {
		var target = $(this);
		var parameter = typeof(parameter) == undefined ? {} : parameter;

		for (var i = 0; i < target.length; i++) {
			autosave.load(target[i], parameter);
		}
	};
})(jQuery);
