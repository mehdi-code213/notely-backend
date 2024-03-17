import j from "joi";

export const userLoginReqSchema = j
  .object({
    body: j
      .object({
        username: j.string().required(),
        password: j.string().required(),
      })
      .unknown(true),
  })
  .unknown(true);

export const userRefreshReqSchema = j
  .object({
    cookies: j
      .object({
        refresh_token: j.string().required(),
      })
      .unknown(true),
  })
  .unknown(true);
