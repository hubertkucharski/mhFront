import React from "react";
import {FormPasswordSite} from "../../components/Auth/PasswordChange/FormPasswordSite";

export const PasswordChangePage: React.FC = () => {
  return <FormPasswordSite activateOrReset={'reset'}/>;
};
