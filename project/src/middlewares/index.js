// fs
import accessLogger from './accessLogger'
import reqParser from './reqParser'
import catchError from './catchError'
import reqLog from './reqLog'
import extendReqRes from './extendReqRes'

export default function (ctx) {
  return {
    accessLogger: accessLogger(...arguments),
    reqParser: reqParser(...arguments),
    catchError: catchError(...arguments),
    reqLog: reqLog(...arguments),
    extendReqRes: extendReqRes(...arguments),
  }
}
