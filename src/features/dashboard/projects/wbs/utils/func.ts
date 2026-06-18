export const throttle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  let lastCall = 0

  return (...args: T) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      callback(...args)
      lastCall = now
    }
  }
}

export const findClosestPositionWithBinarySearch = (
  positions: number[],
  mouseX: number,
): number => {
  let left = 0
  let right = positions.length - 1

  // 마우스가 모든 위치보다 왼쪽에 있는 경우
  if (mouseX <= positions[0]) {
    return positions[0]
  }

  // 마우스가 모든 위치보다 오른쪽에 있는 경우
  if (mouseX >= positions[right]) {
    return positions[right]
  }

  // 이진 탐색으로 마우스 위치가 속한 구간 찾기
  while (left <= right) {
    if (right - left <= 1) {
      // 두 위치 중 더 가까운 것 선택
      const leftDiff = Math.abs(positions[left] - mouseX)
      const rightDiff = Math.abs(positions[right] - mouseX)
      return leftDiff <= rightDiff ? positions[left] : positions[right]
    }

    const mid = Math.floor((left + right) / 2)
    if (positions[mid] < mouseX) {
      left = mid
    } else {
      right = mid
    }
  }

  return positions[left] // 기본값 반환
}
