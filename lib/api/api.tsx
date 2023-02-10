import { getToken } from "../auth/auth";

// export const baseUrl = "http://localhost:8000/api";
export const baseUrl =
  "http://sway-env.eba-mc4svv2c.eu-west-1.elasticbeanstalk.com/api";

//   switch when developing

export const secureGet = async (url: string, method = "get") => {
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
  };

  return config;
};

export const secureWithBody = async (
  url: string,
  data: unknown,
  method: string
) => {
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
    data,
  };

  return config;
};
export const secureNoBody = async (url: string, method: string) => {
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
  };

  return config;
};

export const secureDelete = async (url: string, method = "delete") => {
  const config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
  };

  return config;
};
