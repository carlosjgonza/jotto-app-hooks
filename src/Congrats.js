import React from 'react';

import successContext from './contexts/successContext';
import LanguageContext from './contexts/LanguageContext';
import stringsModule from './helpers/string';

/**
 * Functional react component for congratulatory message.
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered component (or null if 'success' prop is false)
 */
const Congrats = () => {
  const language = React.useContext(LanguageContext);
  const [success] = successContext.useSuccess();

  return (
    success ? <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">
        { stringsModule.getStringByLanguage(language, 'congrats') }
      </span>
    </div> : <div data-test="component-congrats" />
  );
};

export default Congrats;