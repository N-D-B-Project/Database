const {
	name,
	version,
	description,
	scripts,
	scriptsInfo,
} = require("../package.json");

const c = {
	cyan: "\x1b[36m",
	green: "\x1b[32m",
	reset: "\x1b[0m",
	bold: "\x1b[1m",
};

console.log();
console.log(`${c.bold}${name} ${version}${c.reset} — ${description}`);
console.log();
console.log(`${c.bold}Available commands:${c.reset}`);

for (const key of Object.keys(scripts).filter((k) => k !== "help")) {
	const info = scriptsInfo?.[key] ?? "";
	console.log(
		`  ${c.green}yarn --cwd Database ${key.padEnd(22)}${c.reset}${c.cyan}${info}${c.reset}`,
	);
}

console.log();
