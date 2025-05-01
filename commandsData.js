const commandsData = [
	// Общие команды
	{
		name: 'help',
		description: 'Показать это окно',
		category: 'Общие команды',
		action: () => { showHelp(); }
	},
	{
		name: 'deepl',
		description: '[sourse_l] [out_l] [query] | Переводчик',
		category: 'Общие команды',
		action: (args) => {
			if (args.length >= 3) {
				const [fromLang, toLang, ...textToTranslate] = args;
				const url = `https://www.deepl.com/en/translator#${encodeURIComponent(fromLang)}/${encodeURIComponent(toLang)}/${encodeURIComponent(textToTranslate.join(' '))}`;
				window.open(url);
			} else {
				showError("Некорректный формат команды. Используйте: deepl [исходный язык] [целевой язык] [текст]");
			}
		}
	},
	{
		name: 'currencies',
		description: '[from-to] | Курсы валют',
		category: 'Общие команды',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://ru.investing.com/currencies/${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'addons',
		description: '[query] | Дополнения Firefox',
		category: 'Общие команды',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://addons.mozilla.org/ru/firefox/search/?q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'programming',
		description: 'Онлайн интерпретатор',
		category: 'Общие команды',
		action: () => {
			window.open(`https://www.onlinegdb.com/`);
		}
	},
	{
		name: 'typing',
		description: 'Слепая печать',
		category: 'Общие команды',
		action: () => {
			window.open(`https://klava.org/delta/`);
		}
	},
	{
		name: 'math',
		description: 'Вышмат калькуляторы',
		category: 'Общие команды',
		action: () => {
			window.open(`https://math24.biz/`);
		}
	},
	
	// Поисковики
	{
		name: 'd',
		description: 'DuckDuckGo',
		category: 'Поисковики',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=web`);
		}
	},
	{
		name: 'g',
		description: 'Google',
		category: 'Поисковики',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'y',
		description: 'Yandex',
		category: 'Поисковики',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://ya.ru/search/?text=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'b',
		description: 'Bing',
		category: 'Поисковики',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://www.bing.com/search?q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 't',
		description: 'Telegram',
		category: 'Поисковики',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://cse.google.com/cse?q=+&cx=006368593537057042503:efxu7xprihg#gsc.tab=0&gsc.q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'm',
		description: 'What Is My Movie',
		category: 'Поисковики',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://whatismymovie.com/results?text=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'k',
		description: 'Kribrum',
		category: 'Поисковики',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://kribrum.io/search?query=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'c',
		description: 'Duck AI',
		category: 'Поисковики',
		action: () => {
			window.open(`https://duckduckgo.com/?q=DuckDuckGo+AI+Chat&ia=chat`);
		}
	},
	
	// Приложения
	{
		name: 'git',
		description: '[query] | GitHub',
		category: 'Приложения',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://github.com/search?q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'chocolatey',
		description: '[query] | Chocolatey (Win)',
		category: 'Приложения',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://community.chocolatey.org/packages?q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'flathub',
		description: '[query] | FlatHub (Linux)',
		category: 'Приложения',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://flathub.org/apps/search?q=${encodeURIComponent(query)}`);
		}
	},
	
	// Другое
	{
		name: 'yt',
		description: '[запрос] | Поиск на YouTube',
		category: 'Другое',
		action: (args) => {
			const query = args.join(' ');
			if (query) {
				window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
			} else {
				window.open('https://www.youtube.com');
			}
		}
	},
	{
		name: 'archive',
		description: '[URL (без http://)] | Поиск на WebArchive',
		category: 'Другое',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://web.archive.org/web/*/${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'weather',
		description: '[city (en)] | Яндекс погода',
		category: 'Другое',
		action: (args) => {
			const city = args.join(' ');
			window.open(`https://yandex.ru/pogoda/${encodeURIComponent(city)}`);
		}
	},
	{
		name: 'news',
		description: '[тема] | Новости',
		category: 'Другое',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://news.google.com/search?q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'perplexity',
		description: '[запрос] | Спросить Perplexity',
		category: 'Другое',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'icons',
		description: '[запрос] | Simple Icons',
		category: 'Другое',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://www.svgrepo.com/vectors/${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'wolfram',
		description: '[выражение] | Wolfram Alpha',
		category: 'Другое',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://www.wolframalpha.com/input?i=${encodeURIComponent(query)}`);
		}
	},
	
	// Инструменты
	{
		name: 'myip',
		description: 'Информация об IP',
		category: 'Инструменты',
		action: () => {
			fetchMyIpInfo();
		}
	},
	{
		name: 'ip',
		description: '[address] | Информация об IP',
		category: 'Инструменты',
		action: (args) => {
			const ip = args[0];
			if (ip) {
				fetchIpInfo(ip);
			} else {
				showError("Пожалуйста, введите IP-адрес после команды 'ip'.");
			}
		}
	},
	{
		name: 'traceroute',
		description: '[domain / ip] | Traceroute',
		category: 'Инструменты',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://geotraceroute.com/?host=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'cert',
		description: '[domain] | Certificate Database',
		category: 'Инструменты',
		action: (args) => {
			const query = args.join(' ');
			window.open(`${proxyUrl}https://crt.sh/?q=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'hash',
		description: '[hash] | CrackStation',
		category: 'Инструменты',
		action: (args) => {
			const query = args.join(' ');

			const form = document.createElement('form');
			form.method = 'POST';
			form.action = 'https://crackstation.net/';
			form.target = '_blank'; // Открыть в новом окне

			const hashesInput = document.createElement('input');
			hashesInput.type = 'hidden';
			hashesInput.name = 'hashes';
			hashesInput.value = query;
			form.appendChild(hashesInput);

			const crackInput = document.createElement('input');
			crackInput.type = 'hidden';
			crackInput.name = 'crack';
			crackInput.value = 'Crack Hashes';
			form.appendChild(crackInput);

			document.body.appendChild(form);
			form.submit();
			document.body.removeChild(form); // Удаляем форму после отправки
		}
	},
	{
		name: 'dns',
		description: '[dns] | NS Lookup',
		category: 'Инструменты',
		action: (args) => {
			const dnsQuery = args.join(' ');
			window.open(`https://dnslookup.online/?q=${encodeURIComponent(dnsQuery)}`);
		}
	},
	{
		name: 'gtfobins',
		description: '[name] | Priv Escalation bins',
		category: 'Инструменты',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://gtfobins.github.io/#${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'requestbin',
		description: 'Аналог Burp Suite',
		category: 'Инструменты',
		action: () => {
			window.open(`https://requestbin.com/`);
		}
	},
	{
		name: 'crypt',
		description: ' [query] | [Де]шифратор',
		category: 'Инструменты',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://dencode.com/en/?v=${encodeURIComponent(query)}`);
		}
	},
	{
		name: 'hacktricks',
		description: '[query] | Hack Tricks',
		category: 'Инструменты',
		action: (args) => {
			const query = args.join(' ');
			window.open(`https://book.hacktricks.xyz/?q=${encodeURIComponent(query)}`);
		}
	}
];