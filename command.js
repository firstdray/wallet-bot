const ethers =  require("ethers");
const {parseUnits, parseEther, Contract} = require("ethers");
// https://polygon-mumbai-pokt.nodies.app это матик
// https://goerli.blockpi.network/v1/rpc/public this goerli
const url = 'https://polygon-mumbai-pokt.nodies.app'
const privateKey = 'Сюда приватный ключ'
const provider = new ethers.JsonRpcProvider(url)
const wallet = new ethers.Wallet(privateKey, provider)
const ERC20 = 'адрес контракта токена'
const abi = [
    "function transfer(address to, uint amount)",
    "function balanceOf(address account) public view returns (uint)",
    "function symbol() view returns (string)"
]
async function getBalance(network, address) {
    const provider = ethers.getDefaultProvider(network);
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balance) // wei to ether
    // создаём новую переменную в которой наш баланс
    let strNumber = balanceInEth
    // меняем тип данных у баланса на число(была строка)
    let number = parseFloat(strNumber)
    // округляем баланс
    let roundedBalance = number.toFixed(6)
    return roundedBalance
}

async function sendEth() {
    const balance = await provider.getBalance(wallet.address)
    let sendValue = parseEther("количество крипты")
    let str = ethers.formatEther(sendValue)
    if (balance >= sendValue) {
    const tx = await wallet.sendTransaction({
        to: "кому отправляем",
        value: parseEther(str)
    });
    console.log(tx.hash)
    const receipt = await tx.wait();
    console.log(receipt)
    return `Отправлено ${str} ETH`
    }
    else {
        return 'Недостаточно баланса'
    }
}

async function sendErc20() {
    const contract = new Contract(ERC20, abi, wallet)
    const balanceERC20 = await contract.balanceOf(wallet.address)
    const valueToken = '11'
    const amount = parseUnits(valueToken, 18);
    if (balanceERC20 >= amount){
    const tx = await contract.transfer("кому отправляем", amount)
    console.log(tx.hash)
    const receipt = await tx.wait();
    console.log(receipt)
    return `Отправлено ${valueToken}`
    }
    else {
        return "Недостаточно токенов"
    }
}

async function getBalanceERC20(ERC20){
    const contract = new ethers.Contract(ERC20, abi, provider)
    const balanceERC20 = await contract.balanceOf(wallet.address)
    const balanceToken = ethers.formatEther(balanceERC20)
    let strNumber = balanceToken
    let number = parseFloat(strNumber)
    let roundedBalance = number.toFixed(2)
    return roundedBalance
}

async function getERC20name(ERC20){
    const contract = new ethers.Contract(ERC20, abi, provider)
    const erc20name = await contract.symbol()
    return erc20name
}

module.exports = {getBalance, getBalanceERC20, getERC20name, sendErc20, sendEth};
