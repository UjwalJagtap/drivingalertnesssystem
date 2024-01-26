var scoresElement;
var isMonitoring = false;
var predictor = document.getElementById("predictor");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var predictorBlock = document.getElementById("predictorBlock");
window.onload = function () {
  var xValues = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  setInterval(() => {
    axios.get("http://127.0.0.1:5000/scoreslist").then(async (resp) => {
      // if(resp.data)
      new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: resp.data,
            },
          ],
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [{ ticks: { min: 0, max: 20 } }],
          },
          animation: {
            duration: 0,
          },
        },
      });
    });
  }, 1000);
};
function resetScore() {
  axios.get("http://127.0.0.1:5000/score/reset");
}
function startMonitoring() {
  predictor = document.getElementById("predictor");
  predictorBlock = document.getElementById("predictorBlock");
startBtn = document.getElementById("startBtn");
startBtn.style.display = "none"
stopBtn = document.getElementById("stopBtn");
stopBtn.style.display = "inline-block"
  isMonitoring = true;
  predictor.src = "http://127.0.0.1:5000/predictor";
  predictorBlock.style.visibility = "visible"
}
function stopMonitoring() {
  predictor = document.getElementById("predictor");
  predictorBlock = document.getElementById("predictorBlock");

  isMonitoring = false;
  setTimeout(() => {
    axios.get("http://127.0.0.1:5000/stop-camera");
    axios.get("http://127.0.0.1:5000/score/reset");
  }, 1000);
  predictor.src = "";
  predictorBlock.style.visibility = "hidden"
  startBtn = document.getElementById("startBtn");
startBtn.style.display = "inline-block"
stopBtn = document.getElementById("stopBtn");
stopBtn.style.display = "none"
}
