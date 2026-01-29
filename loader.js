if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
}

const engines = [
  {
    name: "js",
    load: () => import("./engines/engine-js/main.js")
  },
  {
    name: "html",
    load: () => fetch("./engines/engine-html/app.html")
      .then(r => r.text())
      .then(html => {
        document.getElementById("app").innerHTML = html
      })
  },
  {
    name: "wasm",
    load: () => import("./engines/engine-wasm/core.js")
  }
]

let active = 0

async function startEngine(i) {
  try {
    console.log("Starting", engines[i].name)
    await engines[i].load()
  } catch {
    console.warn("Engine failed:", engines[i].name)
    failover()
  }
}

function failover() {
  active++
  if (active >= engines.length) {
    document.getElementById("app").innerHTML = "All engines failed"
    return
  }
  startEngine(active)
}

startEngine(active)

