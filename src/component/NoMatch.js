import React from "react";

const NoMatch = ({ location })   => (
  <div>
    <h3>
      Pagina não encontrada <code>{location.pathname}</code>
    </h3>
  </div>
);

export default NoMatch;
