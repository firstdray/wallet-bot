const { Telegraf } = require('telegraf')
const etherBalance = require("./function/command.js")

const bot = new Telegraf('сюда пишем API бота')
bot.command('balance', async (ctx) => {
    const balance = await etherBalance.getBalance()
    ctx.reply(`${balance} ETH`)
})
bot.command('balancetoken', async (ctx) => {
    let balanceToken = await etherBalance.getBalanceERC20()
    let erc20name = await etherBalance.getERC20name()
    ctx.reply(`${balanceToken} ${erc20name}`)
})
bot.command('sendeth', async (ctx) => {
    ctx.reply(`Отправлено`)
    let sendEth = await etherBalance.sendEth()
})
bot.command('sendtoken', async (ctx) => {
    ctx.reply(`Отправлено`)
    let sentoken = await etherBalance.sendErc20()
})

bot.launch()
