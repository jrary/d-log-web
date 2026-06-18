import { last } from "es-toolkit"
import { isEmpty, toNumber } from "es-toolkit/compat"
import { useLocation, useSearchParams } from "react-router"
import ChevronLeft from "~icons/local/ic_chevron_left"
import ChevronRight from "~icons/local/ic_chevron_right"
import * as Styled from "./styled"

type Props = {
  total: number
}

export function Pagination({ total }: Props) {
  const page = toNumber(useSearchParams()[0].get("page") ?? "0")

  const search = useLocation().search.replace(/\?$/, "")
  const pageExcludeSearch = search.replace(/&?page=\d+/, "")

  const href = (target: number) =>
    page === target - 1
      ? search
      : `${!isEmpty(pageExcludeSearch) ? `${pageExcludeSearch}&` : "?"}page=${target - 1}`

  const links = Array.from({ length: total }, (_, index) => index + 1)

  const showEllipsis = total > 5
  const lastElement = last(links) ?? 0

  const ellipsisLinks = (target: number) => {
    if (!showEllipsis) {
      return links
    }

    if (target < 4) {
      return links.slice(1, 4)
    }

    if (target > lastElement - 2) {
      return links.slice(-4, -1)
    }

    return links.slice(target - 2, target + 1)
  }

  return (
    <Styled.Container id="pagination">
      <Styled.Navigate
        to={href(Math.max(1, page))}
        data-disabled={page === 0}
        title="이전 페이지">
        <ChevronLeft />
      </Styled.Navigate>

      <Styled.Links>
        {showEllipsis && (
          <Styled.Navigate data-active={page === 0} to={href(1)}>
            1
          </Styled.Navigate>
        )}
        {showEllipsis && page > 3 && <Styled.Ellipsis>···</Styled.Ellipsis>}
        {ellipsisLinks(page).map((target) => (
          <li key={target}>
            <Styled.Navigate
              data-active={page === target - 1}
              to={href(target)}>
              {target}
            </Styled.Navigate>
          </li>
        ))}
        {showEllipsis && page < total - 2 && (
          <Styled.Ellipsis>···</Styled.Ellipsis>
        )}
        {showEllipsis && (
          <Styled.Navigate
            data-active={page === lastElement - 1}
            to={href(lastElement)}>
            {lastElement}
          </Styled.Navigate>
        )}
      </Styled.Links>

      <Styled.Navigate
        to={href(Math.min(total, page + 2))}
        data-disabled={page === total - 1}
        title="다음 페이지">
        <ChevronRight />
      </Styled.Navigate>
    </Styled.Container>
  )
}
