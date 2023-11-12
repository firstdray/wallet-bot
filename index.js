const { Markup, Telegraf } = require('telegraf')
const etherBalance = require("./function/command.js")


const bot = new Telegraf('сюда API бота')
bot.command('balance', async (ctx) => {
    ctx.reply(
        'Выбирите сеть',
        Markup.inlineKeyboard([
            Markup.button.callback("polygon", "polygon"),
            Markup.button.callback('arbitrum', 'arbitrum'),
            Markup.button.callback('bsc', 'bsc'
        )]))
    bot.action('polygon', async (ctx) => {
        const network = "https://polygon-mumbai-pokt.nodies.app"
        const address = "свой адрес кошелька"
        const balance = await etherBalance.getBalance(network, address)
        ctx.reply(`${balance} Matic`)
    })
    bot.action('arbitrum', async (ctx) => {
        const network = "https://arb-mainnet-public.unifra.io"
        const address = "свой адрес кошелька"
        const balance = await etherBalance.getBalance(network, address)
        ctx.reply(`${balance} ETH`)
    })
    bot.action('bsc', async (ctx) => {
        const network = "https://binance.llamarpc.com"
        const address = "свой адрес кошелька"
        const balance = await etherBalance.getBalance(network, address)
        ctx.reply(`${balance} BNB`)
    })
})

bot.command('balancetoken', async (ctx) => {
    ctx.reply('Введите Адресс Контракта токена')
    bot.on('text', async (ctx) => {
        const ERC20 = ctx.message.text
    let balanceToken = await etherBalance.getBalanceERC20(ERC20)
    let erc20name = await etherBalance.getERC20name(ERC20)
    ctx.reply(`${balanceToken} ${erc20name}`)
})
})
bot.command('sendeth', async (ctx) => {
    let transaction = await etherBalance.sendEth()
    ctx.reply(`${transaction}`)
})
bot.command('sendtoken', async (ctx) => {
    const transaction = await etherBalance.sendErc20()
    const erc20name = await etherBalance.getERC20name()
    ctx.reply(`${transaction} ${erc20name}`)
})

bot.launch()
