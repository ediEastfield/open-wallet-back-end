/* eslint-disable camelcase */

const mapDBToModel = ({
  id,
  category,
  description,
  date,
  nominal,
  inserted_at,
  updated_at,
}) => ({
  id,
  category,
  description,
  date,
  nominal,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModel };
