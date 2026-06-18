import { COLOR } from "@components/shared-components/tokens/color"

export function getTokenColor<Tokens extends Record<string, string>>(
  tokens: Tokens,
  color: keyof Tokens | COLOR | string = "",
) {
  // 빈 문자열일 경우 무시
  if (color === "") {
    return undefined
  }

  // 주어진 토큰의 색상 키일 경우 해당 토큰의 색상 반환
  if (color in tokens) {
    return tokens[color]
  }

  // 주어진 색상이 COLOR의 키일 경우 해당 색상 반환
  if (color in COLOR) {
    return color
  }

  // 주어진 색상이 COLOR의 값과 같은 경우 해당 색상 반환
  if (Object.values(COLOR).includes(color as COLOR)) {
    return color
  }

  return color
}
