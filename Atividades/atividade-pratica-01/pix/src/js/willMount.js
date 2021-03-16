getAllBanks()
    .then(res => this.BANKS = res)
    .catch(err => console.log(err));

this.getRandomBank = () => {
    return this.BANKS[Math.floor(Math.random() * this.BANKS.length)];
}