import {css, DefaultTheme} from 'styled-components'
import {createTheme} from '@mui/material';

export const styledTheme: DefaultTheme = {
    color: {
        primary: '#2E2E2E',
        text1: '#3B3B3B',
        grey1: '#6E7178',
        grey2: '#AAB0BB',
        grey3: '#E4E8EF',
        grey4: '#F6F8FB',
        grey5: '#FAFBFD',
        white: '#FFFFFF',
        red: '#FF5348',
        red_dark: '#DB4B42',
        primary_dark: '#000000',
        brand: '#616EFF',
        green: '#27D758',
        blue: '#3864DE'
    },
    flex: {
        center: css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `
    }
}

export const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#2E2E2E',
            dark: '#000000',
        },
    },
})

