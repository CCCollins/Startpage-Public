// PROXY
const proxyUrl = 'https://api.allorigins.win/raw?url=';

// Browser and OS detection
const browserNameElement = document.getElementById('browser-name');
const osVersionElement = document.getElementById('os-version');
const browserEngineElement = document.getElementById('browser-engine');
const userAgent = navigator.userAgent.toLowerCase();
const infoOverlay = document.getElementById('infoOverlay');
const infoText = document.getElementById('info-text');
const myipOverlay = document.getElementById('myipOverlay');
const ipInfo = document.getElementById('ip-info');
	

function showHelp() {
		const helpOverlay = document.getElementById('helpOverlay');
		const helpContent = document.querySelector('.help-content');
		
		helpOverlay.style.display = 'flex';
		helpContent.innerHTML = `
			<h2>Использование</h2>
			<ul>
				<li>TAB для автозаполнения команды</li>
				<li>ESC для закрытия всплывающих окон</li>
			</ul>
		`;

		// Создаем список уникальных категорий
		const categories = [...new Set(commandsData.map(cmd => cmd.category))];

		// Добавляем разделы для каждой категории
		categories.forEach(category => {
			helpContent.innerHTML += `<h2>${category}</h2><ul>`;
			
			// Фильтруем команды по текущей категории и добавляем их в список
			commandsData
				.filter(cmd => cmd.category === category)
				.forEach(cmd => {
					helpContent.innerHTML += `<li><strong>${cmd.name}</strong> — ${cmd.description}</li>`;
				});

			helpContent.innerHTML += '</ul>';
		});
	}
	
function fetchMyIpInfo() {
	// Запрос на получение IP-адреса
	fetch("https://api.ipify.org?format=json")
		.then(response => {
			if (response.ok) return response.json();
			throw new Error('Network response was not ok.');
		})
		.then(ipData => {
			// Запрос на получение User Agent
			return fetch("https://httpbin.org/user-agent")
				.then(response => {
					if (response.ok) return response.json();
					throw new Error('Network response was not ok.');
				})
				.then(uaData => {
					// Получение данных о браузере и устройстве
					const screenWidth = window.screen.width;
					const screenHeight = window.screen.height;
					const language = navigator.language || 'Неизвестно';
					const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
					const connectionType = connection.effectiveType || 'Неизвестно';
					const referrer = document.referrer || 'Неизвестно';
					const location = window.location.href || 'Неизвестно';

					// Технологии
					const technologies = [
						{ name: '├Cookies', supported: navigator.cookieEnabled },
						{ name: '├JavaScript', supported: true },
						{ name: '├Local Storage', supported: typeof(Storage) !== 'undefined' },
						{ name: '├Session Storage', supported: typeof(sessionStorage) !== 'undefined' },
						{ name: '├Service Workers', supported: 'serviceWorker' in navigator },
						{ name: '├WebAssembly', supported: typeof(WebAssembly) === 'object' },
						{ name: '├WebGL', supported: !!window.WebGLRenderingContext },
						{ name: '├WebRTC', supported: 'RTCPeerConnection' in window },
					].map(tech => `${tech.name}: ${tech.supported ? '+' : '-'}`).join('<br>');

					// Геолокация
					const geoSuccess = (position) => {
						const latitude = position.coords.latitude;
						const longitude = position.coords.longitude;
						const locationLink = `<a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">${latitude},${longitude}</a>`;

						const ipDetails = `
							<strong>IP:</strong> ${ipData.ip || 'Неизвестно'}<br>
							<strong>User Agent:</strong> ${uaData["user-agent"] || 'Неизвестно'}<br>
							<strong>Разрешение экрана:</strong> ${screenWidth}x${screenHeight}<br>
							<strong>Язык браузера:</strong> ${language}<br>
							<strong>Тип подключения:</strong> ${connectionType}<br>
							<strong>Реферер:</strong> ${referrer}<br>
							<strong>Текущий URL:</strong> ${location}<br>
							<strong>Поддерживаемые технологии:</strong><br> ${technologies}<br>
							<strong>Геолокация:</strong> ${locationLink}
						`;
						infoText.innerHTML = ipDetails;
						infoOverlay.style.display = 'flex';
					};

					const geoError = () => {
						const ipDetails = `
							<strong>IP:</strong> ${ipData.ip || 'Неизвестно'}<br>
							<strong>User Agent:</strong> ${uaData["user-agent"] || 'Неизвестно'}<br>
							<strong>Разрешение экрана:</strong> ${screenWidth}x${screenHeight}<br>
							<strong>Язык браузера:</strong> ${language}<br>
							<strong>Тип подключения:</strong> ${connectionType}<br>
							<strong>Реферер:</strong> ${referrer}<br>
							<strong>Текущий URL:</strong> ${location}<br>
							<strong>Поддерживаемые технологии:</strong><br> ${technologies}<br>
							<strong>Геолокация:</strong> Не удалось определить местоположение
						`;
						infoText.innerHTML = ipDetails;
						infoOverlay.style.display = 'flex';
					};

					// Попытка получить геолокацию
					if ('geolocation' in navigator) {
						navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
					} else {
						geoError();
					}
				});
		})
		.catch(error => {
			showError("Не удалось получить информацию об IP и браузере.");
			console.error('Ошибка:', error);
		});
}

function fetchIpInfo(ip) {
	const url = ip ? `${proxyUrl}https://ipinfo.io/${ip}/json` : `${proxyUrl}https://ipinfo.io/json`;
	fetch(url)
		.then(response => {
			if (response.ok) return response.json();
			throw new Error('Network response was not ok.');
		})
		.then(data => {
			const location = data.city && data.region ? `${data.city}, ${data.region}, ${data.country}` : 'Location not found';
			const googleMapsLink = data.loc ? `<a href="https://www.google.com/maps?q=${data.loc}" target="_blank">${data.loc}</a>` : 'Неизвестно';
			
			const hostName = data.hostname ? `<a href="https://www.nslookup.io/domains/${data.hostname}/dns-records/" target="_blank">${data.hostname}</a>` : 'Неизвестно';
			
			const countryInfo = data.country ? `<a href="https://area-codes.cybo.com/${data.country}" target="_blank">${data.country}</a>` : 'Неизвестно';

			const orgName = data.org ? data.org.split(' ')[0] : null;
			const orgLink = orgName ? `<a href="https://ipinfo.io/${orgName}" target="_blank">${data.org}</a>` : 'Неизвестно';
			
			const postalLink = data.postal ? `<a href="https://postal-codes.cybo.com/search/?q=${data.postal}" target="_blank">${data.postal}</a>` : 'Неизвестно';

			const ipDetails = `
				<strong>IP:</strong> ${data.ip || 'Неизвестно'}<br>
				<strong>Хост:</strong> ${hostName}<br>
				<strong>Город:</strong> ${data.city || 'Неизвестно'}<br>
				<strong>Регион:</strong> ${data.region || 'Неизвестно'}<br>
				<strong>Страна:</strong> ${countryInfo}<br>
				<strong>Местоположение:</strong> ${googleMapsLink}<br>
				<strong>Организация:</strong> ${orgLink}<br>
				<strong>Почтовый индекс:</strong> ${postalLink}<br>
				<strong>Часовой пояс:</strong> ${data.timezone || 'Неизвестно'}
			`;
			infoText.innerHTML = ipDetails;
			infoOverlay.style.display = 'flex';
		})
		.catch(error => {
			showError("Не удалось получить информацию об IP. Проверьте введённый IP-адрес.");
			console.error('Ошибка:', error);
		});
}


document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    document.getElementById('hamburger').addEventListener('click', function() {
        var navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('active');
    });

    // Close overlays on click
    document.querySelectorAll('.help-overlay, .overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });
	
	// Close overlays on ESC key press
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') { // Проверяем, была ли нажата клавиша ESC
			document.querySelectorAll('.help-overlay, .overlay').forEach(overlay => {
				overlay.style.display = 'none'; // Скрываем каждый оверлей
			});
		}
	});
	
	// Данные секций
    function createSections(sectionsData) {
		const container = document.querySelector(".sections-container");

		sectionsData.forEach(section => {
			const sectionElement = document.createElement("div");
			sectionElement.className = "section";
			sectionElement.style.borderLeft = `4px solid ${section.borderColor}`;

			const titleElement = document.createElement("h2");
			titleElement.textContent = section.title;
			sectionElement.appendChild(titleElement);

			section.links.forEach((link, index) => {
				const linkElement = document.createElement("a");
				linkElement.href = link.url;
				linkElement.target = "_blank";
				linkElement.innerHTML = `<img src="${link.img}"> ${link.text}`;
				sectionElement.appendChild(linkElement);

				// Вставляем разделитель после каждых 4 ссылок
				if ((index + 1) % 4 === 0 && index + 1 !== section.links.length) {
					sectionElement.appendChild(document.createElement("hr")).className = "custom-hr";
				}
			});

			// Добавляем кастомные элементы, если они есть
			if (section.customElements) {
				section.customElements.forEach(customHTML => {
					sectionElement.insertAdjacentHTML("beforeend", customHTML);
				});
			}

			container.appendChild(sectionElement);
		});
	}

	createSections(sectionsData);

    const browsers = [
        { name: 'chrome', engine: 'Blink', patterns: ['chrome'], exclude: 'edg' },
        { name: 'firefox', engine: 'Gecko', patterns: ['firefox'] },
        { name: 'edge', engine: 'Blink', patterns: ['edg'] },
        { name: 'safari', engine: 'WebKit', patterns: ['safari'], exclude: 'chrome' },
        { name: 'opera', engine: 'Blink', patterns: ['opera', 'opr'] },
        { name: 'ie', engine: 'Trident', patterns: ['msie', 'trident'] },
    ];

    const operatingSystems = [
        { name: 'Windows 10', patterns: ['windows nt 10.0'] },
        { name: 'Windows 8.1', patterns: ['windows nt 6.3'] },
        { name: 'Windows 8', patterns: ['windows nt 6.2'] },
        { name: 'Windows 7', patterns: ['windows nt 6.1'] },
        { name: 'Windows Vista', patterns: ['windows nt 6.0'] },
        { name: 'Windows XP', patterns: ['windows nt 5.1'] },
        { name: 'macOS', patterns: ['mac os x'], getVersion: (ua) => ua.match(/mac os x ([\d_]+)/)?.[1].replace(/_/g, '.') },
        { name: 'Linux', patterns: ['linux'] },
        { name: 'Android', patterns: ['android'], getVersion: (ua) => ua.match(/android ([\d.]+)/)?.[1] },
        { name: 'iOS', patterns: ['iphone', 'ipad'], getVersion: (ua) => ua.match(/os ([\d_]+)/)?.[1].replace(/_/g, '.') },
    ];

    let browserName = 'unknown';
    let browserEngine = 'unknown';
    let osVersion = 'unknown';

    function detectBrowser() {
        for (const browser of browsers) {
            if (browser.patterns.some(pattern => userAgent.includes(pattern)) &&
                (!browser.exclude || !userAgent.includes(browser.exclude))) {
                browserName = browser.name;
                browserEngine = browser.engine;
                return;
            }
        }
    }

    function detectOS() {
        for (const os of operatingSystems) {
            if (os.patterns.some(pattern => userAgent.includes(pattern))) {
                osVersion = os.name;
                if (os.getVersion) {
                    const version = os.getVersion(userAgent);
                    if (version) osVersion += ` ${version}`;
                }
                return;
            }
        }
    }

    detectBrowser();
    detectOS();

    browserNameElement.textContent = browserName;
    osVersionElement.textContent = osVersion;
    browserEngineElement.textContent = browserEngine;

    setInterval(() => {
        let now = new Date();
        let time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        document.getElementById('time').innerText = time;
    }, 1000);

	// Команды
	function handleCommand(command) {
		const [cmdName, ...args] = command.split(' ');
		const cmdData = commandsData.find(cmd => cmd.name === cmdName);

		if (cmdData) {
			cmdData.action(args);
		} else {
			window.open(command);
		}
	}
	
	const commandInput = document.getElementById('commandInput');
	const suggestionPlaceholder = document.getElementById('suggestionPlaceholder');

	commandInput.addEventListener('input', function() {
		const input = commandInput.value.toLowerCase();
		const suggestions = commandsData
			.filter(cmd => cmd.name.startsWith(input))
			.map(cmd => cmd.name.slice(input.length));
		suggestionPlaceholder.textContent = suggestions.join(', ');
	});

	commandInput.addEventListener('keydown', function(e) {
		if (e.key === 'Tab' && suggestionPlaceholder.textContent) {
			e.preventDefault();
			const input = commandInput.value.toLowerCase();
			const suggestion = commandsData.find(cmd => cmd.name.startsWith(input));
			if (suggestion) {
				commandInput.value += suggestion.name.slice(input.length);
				suggestionPlaceholder.textContent = '';
			}
		}
		if (e.key === 'Enter') {
			handleCommand(commandInput.value.trim());
			commandInput.value = '';
		}
	});
	
	

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' || e.key === 'Tab') {
            e.preventDefault();
            document.getElementById('commandInput').focus();
        }
    });

    document.querySelectorAll('.help-overlay, .overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });

    // Audio player functionality
    const audio = document.getElementById('audio');
	const playPauseButton = document.getElementById('play-pause-button');
	const prevButton = document.getElementById('prev-button');
	const nextButton = document.getElementById('next-button');
	const repeatButton = document.getElementById('repeat-button');

	const tracks = tracksData.flatMap(group => 
		group.tracks.map(track => group.path + track.file)
	);
	let currentTrackIndex = Math.floor(Math.random() * tracks.length);
	let isRepeating = false;

	function playTrack(index) {
		audio.src = tracks[index];
		audio.play();
		playPauseButton.textContent = 'Pause';
	}

	// Set initial random track
	audio.src = tracks[currentTrackIndex];

	playPauseButton.addEventListener('click', function() {
		if (audio.paused) {
			audio.play();
			playPauseButton.textContent = 'Pause';
		} else {
			audio.pause();
			playPauseButton.textContent = 'Play';
		}
	});

	prevButton.addEventListener('click', function() {
		currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
		playTrack(currentTrackIndex);
	});

	nextButton.addEventListener('click', function() {
		currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
		playTrack(currentTrackIndex);
	});

	repeatButton.addEventListener('click', function() {
		isRepeating = !isRepeating;
		repeatButton.style.backgroundColor = isRepeating ? '#2ed8a2' : '#1e212b';
	});

	audio.addEventListener('ended', function() {
		if (isRepeating) {
			audio.play();
		} else {
			nextButton.click();
		}
	});
});