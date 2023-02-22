import React from "react";
import { useSelector } from "react-redux";

import { getCurrentUser } from "spacenet-redux/selectors/entities/common";

export const TestComp = () => {
  const user = useSelector(state => getCurrentUser(state))

  return (
    <div>
      {Object.keys(user).map(key => (
        <div>{key}: {user[key]}</div>
      ))}
    </div>
  )
};