const bcryptjs = require("bcryptjs")

const build = async()=>{
    const pass = "mndjsdnsjnd"
    const passEncoded = await bcryptjs.hash(pass , 10)
    console.log(passEncoded)
    const isValid = await bcryptjs.compare(pass , passEncoded)
    console.log(isValid)
}
build()