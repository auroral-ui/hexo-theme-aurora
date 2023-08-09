import { cleanPath } from '..'

declare const Valine: any

interface ValineConfig {
  appId: string
  appKey: string
  avatar: string
  placeholder: string
  visitor: boolean
  lang: string
  meta: string[]
  requiredFields: string[]
  avatarForce: boolean
  path: string
}

export const valineInit = ({
  appId,
  appKey,
  avatar,
  placeholder,
  visitor,
  lang,
  meta,
  requiredFields,
  avatarForce,
  path
}: ValineConfig) => {
  new Valine({
    el: '#vcomments',
    appId,
    appKey,
    avatar,
    placeholder,
    visitor,
    lang,
    meta: meta ?? [],
    requiredFields: requiredFields ?? [],
    avatarForce,
    path: cleanPath(path)
  })
}
