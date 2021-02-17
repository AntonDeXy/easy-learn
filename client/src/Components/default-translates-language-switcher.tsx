import React from 'react'
import { LanguageSwitcherSt } from './Styled/Styled'
import { changeDefaultTranslatesLanguageThunk } from '../redux/reducers/users/usersReducer'
import { connect } from 'react-redux'

type LanguageSwitcher = {
  userId: string
  currentLanguage: string
  changeDefaultTranslesLanguage: (userId: string, language: string, success: any) => void
}

const DefaultTranslatesLanguageSwitcher:React.FC<LanguageSwitcher> = ({changeDefaultTranslesLanguage, currentLanguage, userId}) => {

  const handleChangeLanguage = (language: string) => {
    changeDefaultTranslesLanguage(
      userId,
      language,
      () => {
        // i18n.changeLanguage(language)
      })
  }

  return (
    <LanguageSwitcherSt>
      <div className={`${currentLanguage === 'ru' && 'current'}`} onClick={() => handleChangeLanguage('ru')}>ru</div>
      <div className={`${currentLanguage === 'en' && 'current'}`} onClick={() => handleChangeLanguage('en')}>en</div>
      <div className={`${currentLanguage === 'de' && 'current'}`} onClick={() => handleChangeLanguage('de')}>de</div>
    </LanguageSwitcherSt>
  )
}


const mapStateToProps = (state:any) => ({
  userId: state.userReducer._id,
  currentLanguage: state.userReducer.defaultTranslatesLanguage
})

const mapDispatchToProps = (dispatch:any) => ({
  changeDefaultTranslesLanguage: (userId: string, language: string, success: any) => dispatch(changeDefaultTranslatesLanguageThunk(userId, language, success))
})

export default connect(mapStateToProps, mapDispatchToProps)(DefaultTranslatesLanguageSwitcher)