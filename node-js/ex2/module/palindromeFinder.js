module.exports = class PalindromeFinder {
    constructor(data) {
        this.DATA = data;
    }
    find() {
        let l, j = 0
        let outputPalindromes = []
        // console.log('this.DATA', this.DATA)
        for (var i = 0; i < this.DATA.length; i++) {
            if (typeof (this.DATA[i]) == "string") {
                j = 0
                let toBeCompared = this.DATA[i].toLowerCase()
                toBeCompared = toBeCompared.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\s]/g, '')
                l = toBeCompared.length
                while (j < Math.floor(l / 2)) {
                    if (toBeCompared[j] != toBeCompared[l - 1 - j]) {
                        break;
                    } else {
                        j++;
                    }
                }
                if (j >= Math.floor(l / 2)) {
                    outputPalindromes.push(this.DATA[i])
                }
            }
        }

        return outputPalindromes;
    }
    findOther() {
        let outputNotPalindromes = []
        let l, j = 0
        for (var i = 0; i < this.DATA.length; i++) {
            if (typeof (this.DATA[i]) == "string") {
                j = 0
                let toBeCompared = this.DATA[i].toLowerCase()
                toBeCompared = toBeCompared.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\s]/g, '')
                l = toBeCompared.length
                while (j < Math.floor(l / 2)) {
                    if (toBeCompared[j] != toBeCompared[l - 1 - j]) {
                        outputNotPalindromes.push(this.DATA[i])
                        break;
                    } else {
                        j++;
                    }
                }
            }
        }

        return outputNotPalindromes;
    }
}
