let usiProgress = new ProgressBar.Circle("#usi-progress", {
	strokeWidth: 6,
	easing: 'easeInOut',
	duration: 1400,
	color: '#ff0000',
	trailColor: '#eee',
	trailWidth: 0,
	svgStyle: null,
});


let cowfishProgress = new ProgressBar.Circle("#cowfish-progress", {
	strokeWidth: 6,
	easing: 'easeInOut',
	duration: 1400,
	color: '#ff0000',
	trailColor: '#eee',
	trailWidth: 0,
	svgStyle: null
});

function getProgress(easy, medium, hard, goal)
{
	return Math.min(getScore(easy, medium, hard) / goal, 1.0);
}

function getScore(easy, medium, hard)
{
	return 0.2 * easy + medium + 5 * hard;
}

function fetchData()
{
	console.log("Getting data");
	fetch("https://leetcode-stats-api.herokuapp.com/cowfishh/").then(response => {
		if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
		return response.json();
	}).then(data => {
		let progress = getProgress(data.easySolved, data.mediumSolved, data.hardSolved, 200);
		cowfishProgress.animate(progress, {
			from: { color: "#ff0000" },
			to: { color: "#00ff00" }
		});
		document.getElementById("cowfish-score").innerText = getScore(data.easySolved, data.mediumSolved, data.hardSolved);
		document.getElementById("cowfish-easy").innerText = data.easySolved;
		document.getElementById("cowfish-medium").innerText = data.mediumSolved;
		document.getElementById("cowfish-hard").innerText = data.hardSolved;
	}).catch(error => {
		console.error('There has been a problem with your fetch operation:', error);
	});

	fetch("https://leetcode-stats-api.herokuapp.com/Joshua-Usi/").then(response => {
		if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
		return response.json();
	}).then(data => {
		let progress = getProgress(data.easySolved, data.mediumSolved, data.hardSolved, 200);
		usiProgress.animate(progress, {
			from: { color: "#ff0000" },
			to: { color: "#00ff00" },
		});
		document.getElementById("usi-score").innerText = getScore(data.easySolved, data.mediumSolved, data.hardSolved);
		document.getElementById("usi-easy").innerText = data.easySolved;
		document.getElementById("usi-medium").innerText = data.mediumSolved;
		document.getElementById("usi-hard").innerText = data.hardSolved;
	}).catch(error => {
		console.error('There has been a problem with your fetch operation:', error);
	});
}

window.onload = fetchData();
setInterval(fetchData, 1000 * 10); // Once every 10 seconds