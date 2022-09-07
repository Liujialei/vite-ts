import { JSEncrypt } from 'jsencrypt'
const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJMuRFYWaVtYSS93nSnx+BOVeKHRuERaotvmZRGFNfFWr6yj646kXZfFJgNXKM9lLsI/jgif1r4G305f5Sn5WA94YAYPa88e7wD7IZhhQgcWmkm092Be0HKrsqAef0KfRjIpFTXd1d1KAgnE7SToXR7+JalSho3UC2WKQciVaYYQIDAQAB'
export default (param:string) => {
  const Encrypt = new JSEncrypt()
  Encrypt.setPublicKey(publicKey)
  return Encrypt.encrypt(param)
}