const btn = document.getElementById("button");

const getFormData = () => {
    const yyyy = document.getElementById('year').value
    const mm = document.getElementById('month').value
    const dd = document.getElementById('day').value

    return [Number(yyyy), Number(mm), Number(dd)]
}

const validateInputForm = (yyyy, mm, dd, curYYYY, curMM, curDD) => {
    // console.log(yyyy, mm, dd, curYYYY, curMM, curDD)
    // console.log(typeof(yyyy), typeof(curYYYY), typeof(mm), typeof(curMM), typeof(dd), typeof(curDD))

    // Check if the date is in future
    if(yyyy > curYYYY || (mm > curMM && yyyy >= curYYYY) || (dd > curDD && mm >= curMM && dd > curDD)) return false

    // Check if Days are bigger than 31
    if (dd < 1 || dd > 31) return false

    // Check if Days are bigger than 31
    if (mm < 1 || mm > 12) return false

    if (mm === 2 && dd > 28) return false

    if (mm === 4 && dd > 30) return false

    if (mm === 6 && dd > 30) return false

    if (mm === 9 && dd > 30) return false

    if (mm === 11 && dd > 30) return false

    return true
}

const calculateAge = (yyyy, mm, dd, curYYYY, curMM, curDD) => {

    let ageYYYY = curYYYY - yyyy
    let ageMM = curMM - mm
    let ageDD = curDD - dd
    if(ageMM < 0 || (ageMM === 0 && curDD < dd)){
        ageYYYY--
        ageMM = 12 + curMM - mm
    }

    if(ageDD < 1){
        ageMM--
        ageDD = 31 + curDD - dd
    }

    replaceWithAge(ageYYYY, ageMM, ageDD)
}

const replaceWithAge = (ageYYYY, ageMM, ageDD) => {
    document.querySelector(".years-value").innerHTML = "" + ageYYYY
    document.querySelector(".months-value").innerHTML = "" + ageMM
    document.querySelector(".days-value").innerHTML = "" + ageDD
}

const replaceAge = () => {
    document.querySelector(".years-value").innerHTML = "- -" 
    document.querySelector(".months-value").innerHTML = "- -"
    document.querySelector(".days-value").innerHTML = "- -"
}

const addErrors = () => {
    document.querySelector(".day-error-text").classList.add('active')
    document.querySelector(".month-error-text").classList.add('active')
    document.querySelector(".year-error-text").classList.add('active')
    document.querySelector(".day-form-label").classList.add('active')
    document.querySelector(".month-form-label").classList.add('active')
    document.querySelector(".year-form-label").classList.add('active')
}

const removeErrors = () => {
    document.querySelector(".day-error-text").classList.remove('active')
    document.querySelector(".month-error-text").classList.remove('active')
    document.querySelector(".year-error-text").classList.remove('active')
    document.querySelector(".day-form-label").classList.remove('active')
    document.querySelector(".month-form-label").classList.remove('active')
    document.querySelector(".year-form-label").classList.remove('active')
}


const handleSubmitForm = () => {
    const today = new Date()
    const curYYYY  = Number(today.getFullYear())
    const curMM = Number(today.getMonth()) + 1
    const curDD = Number(today.getDate())

    const [yyyy, mm, dd] = getFormData()
    console.log(validateInputForm(yyyy, mm, dd, curYYYY, curMM, curDD))
    if(validateInputForm(yyyy, mm, dd, curYYYY, curMM, curDD)){
        removeErrors()
        calculateAge(yyyy, mm, dd, curYYYY, curMM, curDD)
    } else {        
        addErrors()
        replaceAge()
    }

}
