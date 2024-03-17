import j from "joi";

export const createUserReqSchema = j
  .object({
    body: j
      .object({
        username: j.string().required(),
        password: j.string().required(),
        email: j.string().required(),
      })
      .unknown(true),
  })
  .unknown(true);
