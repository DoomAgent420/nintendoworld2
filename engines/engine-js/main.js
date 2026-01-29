const app = document.getElementById("app")

app.innerHTML = `
<h1>JS Engine Running</h1>
<button id="crash">Simulate Failure</button>
`

document.getElementById("crash").onclick = () => {
  throw new Error("Engine crashed")
}
