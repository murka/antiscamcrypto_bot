const { Telegraf } = require('telegraf')
const { createWorker } = require('tesseract.js')

const token = process.env.BOT_TOKEN
const trigger = 0.5
const vocabulary = ['blockchain', 'bitcoin', 'giveaway','BTC', 'ETH', 'musk', 'elon']

const bot = new Telegraf(token)

const worker = createWorker({
  logger: m => console.log(m)
})

bot.on('photo', async (ctx, next) => {
  const photos = ctx.message.photo
  const higherhq = photos[photos.length - 1]

  const { file_path } = await ctx.tg.getFile(higherhq.file_id)
  const rootPath = `https://api.telegram.org/file/bot${token}/${file_path}`
  const { data: { text } } = await worker.recognize(rootPath)
  const lowerText = text.toLowerCase()

  let banned = 0
  for(const iterator of vocabulary) {
    banned += lowerText.includes(iterator)
  }
  if(vocabulary.length/banned>=trigger) {
    await ctx.deleteMessage(ctx.message.message_id)
  }
  await next()
})


bot.launch()
  .then( async () => {
    console.log('The bot has been successfully started')
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
  })


process.once('SIGINT', async () => {
  await bot.stop('SIGINT')
  await worker.terminate();
})
process.once('SIGTERM', async () => {
  await bot.stop('SIGTERM')
  await worker.terminate();
})