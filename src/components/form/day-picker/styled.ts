import { Text } from "@components/shared-components/text"
import {
  BACKGROUND,
  BUTTON,
  TEXT,
} from "@components/shared-components/tokens/color"
import { typography } from "@components/shared-components/tokens/typography"
import * as Popover from "@radix-ui/react-popover"
import { DayPicker as BaseDayPicker } from "react-day-picker"
import { ko } from "react-day-picker/locale"
import styled from "styled-components"

export const Trigger = styled(Popover.Trigger)`
  border: none;
  background: none;
  padding: 0;

  font-family: inherit;

  color: ${TEXT.BLACK};

  &[data-highlight="true"] {
    color: ${TEXT.HIGH_EMPHASIS};
  }

  &:not(:disabled) {
    cursor: pointer;
  }
`

export const Placeholder = styled(Text).attrs({
  color: "SECONDARY",
})`
  ${typography.body1};
`

export const Content = styled(Popover.Content).attrs({
  side: "bottom",
  sideOffset: 8,
})<{ align: "start" | "center" | "end" }>`
  ${(props) => `align-items: ${props.align};`}

  padding: 1.5rem;
  background-color: ${BACKGROUND.WHITE};
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

export const DayPicker = styled(BaseDayPicker).attrs({
  locale: ko,
})`
  position: relative;
  box-sizing: border-box;

  & {
    --day-width: 2.5rem;
    --day-height: 1.5rem;

    --text-color: ${TEXT.DEFAULT};

    --today-text-color: ${TEXT.HIGH_EMPHASIS};
    --outside-text-color: ${TEXT.DISABLED};
    --disabled-text-color: ${TEXT.DISABLED};

    --selected-background-color: #d2f2d1;

    --button-border-radius: 999rem;
    --first-button-border-radius: var(--button-border-radius) 0 0
      var(--button-border-radius);
    --last-button-border-radius: 0 var(--button-border-radius)
      var(--button-border-radius) 0;
  }

  .rdp-day {
    width: var(--day-width);
    height: var(--day-height);

    padding: 0.2rem 0;

    &:not(.rdp-disabled):not(.rdp-selected) {
      .rdp-day_button:hover {
        background-color: ${BUTTON.HOVER};
      }
    }

    .rdp-day_button {
      ${typography.caption}

      color: var(--text-color);

      border: none;
      background: none;
      padding: 0;

      width: 100%;
      height: 100%;

      border-radius: var(--button-border-radius);

      color: inherit;
      font-weight: inherit;
      text-decoration: inherit;

      cursor: pointer;
    }
  }

  .rdp-day_button:disabled {
    color: ${TEXT.DISABLED};
    cursor: revert;
  }

  .rdp-button_next,
  .rdp-button_previous {
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background: none;

    padding: 0.5rem;

    cursor: pointer;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  .rdp-button_next:disabled,
  .rdp-button_previous:disabled {
    cursor: revert;
  }

  .rdp-month_caption {
    ${typography.body1}

    height: 2rem;
    margin-bottom: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 700;
  }

  .rdp-months {
    position: relative;

    display: flex;
    flex-wrap: wrap;

    gap: 2.5rem;
    max-width: fit-content;
  }

  .rdp-month_grid {
    border-collapse: collapse;
  }

  .rdp-nav {
    position: absolute;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 0.5rem;
  }

  .rdp-weekday {
    ${typography.caption};
    color: var(--text-color);

    width: var(--day-width);
    height: var(--day-height);
  }

  .rdp-today:not(.rdp-outside) {
    font-weight: 700;
    color: var(--today-text-color);
    text-decoration: underline;
  }

  .rdp-selected {
  }

  .rdp-selected {
    .rdp-day_button {
      font-weight: 500;
      background: var(--selected-background-color);
    }
  }

  .rdp-outside {
    color: var(--outside-text-color);
  }

  .rdp-hidden {
    visibility: hidden;
  }

  .rdp-range_start {
    .rdp-day_button {
      background: var(--selected-background-color);
      border-radius: var(--first-button-border-radius);
    }

    &:last-child {
      .rdp-day_button {
        border-radius: var(--button-border-radius);
      }
    }
  }

  .rdp-range_middle {
    .rdp-day_button {
      background: var(--selected-background-color);
      border-radius: 0;
    }

    &:first-child {
      .rdp-day_button {
        border-radius: var(--first-button-border-radius);
      }
    }

    &:last-child {
      .rdp-day_button {
        border-radius: var(--last-button-border-radius);
      }
    }
  }

  .rdp-range_end {
    .rdp-day_button {
      background: var(--selected-background-color);
      border-radius: var(--last-button-border-radius);
    }

    &:first-child {
      .rdp-day_button {
        border-radius: var(--button-border-radius);
      }
    }
  }

  .rdp-range_start.rdp-range_end {
    .rdp-day_button {
      border-radius: var(--button-border-radius);
    }
  }

  .rdp-focusable {
    cursor: pointer;
  }
`
