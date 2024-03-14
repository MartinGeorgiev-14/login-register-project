import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"
import * as basic from "../helpingScripts/basicFunctions.js"

const user = await specific.isUserActive()

if (user.role !== "admin") {
    basic.changeWindow("../index.html")
}