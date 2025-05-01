const sectionsData = [
	{
		title: "General",
		borderColor: "#2ed8a2",
		links: [
			{ url: "https://www.ilovepdf.com/ru", img: "pages/assets/link-icons/pdf.svg", text: "I Love PDF" },
			{ url: "https://mail.google.com/mail/u/0/#inbox", img: "pages/assets/link-icons/googledrive.svg", text: "Google Drive" },
			{ url: "https://archive.org/", img: "pages/assets/link-icons/internetarchive.svg", text: "Internet Archive" },
			{ url: "https://2gis.ru/spb/", img: "pages/assets/link-icons/googlemaps.svg", text: "2GIS Maps" },
		]
	},
	{
		title: "AI",
		borderColor: "#d1aff8",
		links: [
			{ url: "https://www.virustotal.com/gui/home/upload", img: "pages/assets/link-icons/virustotal.svg", text: "VirusTotal" },
			{ url: "https://www.deepl.com/ru/translator", img: "pages/assets/link-icons/deepl.svg", text: "DeepL" },
			{ url: "https://www.perplexity.ai/", img: "pages/assets/link-icons/perplexity.svg", text: "Perplexity" },
			{ url: "https://chat.openai.com/", img: "pages/assets/link-icons/openai.svg", text: "ChatGPT" },
		]
	},
	{
		title: "Notion",
		borderColor: "#62e0e2",
		links: [
			{ url: "https://www.notion.so/", img: "pages/assets/link-icons/notion.svg", text: "Notion" },
			{ url: "https://app.super.so/", img: "pages/assets/link-icons/super.svg", text: "Super App" },
			{ url: "https://app.notionlytics.com/", img: "pages/assets/link-icons/analytics.svg", text: "Notionlytics" },
			{ url: "https://imetspbstu.super.site/", img: "pages/assets/link-icons/pivotaltracker.svg", text: "База" },
		]
	},
	{
		title: "Crack",
		borderColor: "#e8b195",
		links: [
			{ url: "https://tryhackme.com/", img: "pages/assets/link-icons/tryhackme.svg", text: "TryHackMe" },
			{ url: "https://www.kali.org/tools/", img: "pages/assets/link-icons/kalilinux.svg", text: "Kali Tools" },
			{ url: "https://www.exploit-db.com/", img: "pages/assets/link-icons/metasploit.svg", text: "Exploit DB" },
			{ url: "https://hackertarget.com/nmap-online-port-scanner/", img: "pages/assets/link-icons/eye.svg", text: "Nmap Scan" },
		]
	},
	{
		title: "Обучение",
		borderColor: "#ec6183",
		links: [
			{ url: "https://crackstatus.net/", img: "pages/assets/link-icons/rockstargames.svg", text: "Crack Status" },
			{ url: "https://plati.market/", img: "pages/assets/link-icons/plati.svg", text: "Plati Market" },
			{ url: "https://s1.sharewood.co/", img: "pages/assets/link-icons/sharewood.svg", text: "Sharewood" },
			{ url: "https://s4.skladchina.vip/", img: "pages/assets/link-icons/folding.svg", text: "Skladchina VIP" },
			{ url: "https://demonstrations.wolfram.com/", img: "pages/assets/link-icons/wolfram.svg", text: "Wolfram Demonstrations" },
			{ url: "https://gallerix.org/", img: "pages/assets/link-icons/gallery.svg", text: "Gallerix Museum" },
			{ url: "https://liveclasses.ru/", img: "pages/assets/link-icons/play.svg", text: "Liveclasses" },
		],
		customElements: [
			`<div id="audio-player" class="audio-player">
				<button id="prev-button">Prev</button>
				<button id="play-pause-button">Play</button>
				<button id="next-button">Next</button>
				<button id="repeat-button">Repeat</button>
				<audio id="audio"></audio>
			</div>`
		]
	},
	{
		title: "Универ",
		borderColor: "#2bc3de",
		links: [
			{ url: "https://www.microsoft365.com/", img: "pages/assets/link-icons/microsoft365.svg", text: "Microsoft365" },
			{ url: "https://teams.microsoft.com/v2/", img: "pages/assets/link-icons/teams.svg", text: "Teams" },
			{ url: "https://csspbstu-my.sharepoint.com/", img: "pages/assets/link-icons/onedrive.svg", text: "OneDrive" },
			{ url: "https://mail.spbstu.ru/", img: "pages/assets/link-icons/outlook.svg", text: "Outlook" },
			{ url: "https://openedu.ru/my/", img: "pages/assets/link-icons/opencollective.svg", text: "Open Edu" },
			{ url: "https://ruz.spbstu.ru/", img: "pages/assets/link-icons/googlecalendar.svg", text: "Расписание" },
			{ url: "https://dl-imet.spbstu.ru/my/", img: "pages/assets/link-icons/buildkite.svg", text: "СДО ИПМЭиТ" },
			{ url: "https://lms.spbstu.ru/course/index.php?mycourses=1", img: "pages/assets/link-icons/pi.svg", text: "СДО СПбПУ" },
		]
	},
	{
		title: "Пример",
		borderColor: "#e8b195",
		links: [
		],
		customElements: [
			`<a href="https://www.youtube.com/watch?v=W47jx3y_76A" target="_blank">
				<img src="pages/assets/general/cyber.png" style="width: 210px; height: 210px;">
			</a>`
		]

	}
];