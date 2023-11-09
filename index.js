const { Telegraf } = require('telegraf')
const etherBalance = require("./function/command.js")

const bot = new Telegraf('пишем сюда API телеграм бота')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.command('balance', async (ctx) => {
    const balance = await etherBalance.getBalance()
    ctx.reply(`${balance} ETH`)
})
bot.command('balancetoken', async (ctx) => {
    let balanceToken = await etherBalance.getBalanceERC20()
    let erc20name = await etherBalance.getERC20name()
    ctx.reply(`${balanceToken} ${erc20name}`)
})

bot.launch()
