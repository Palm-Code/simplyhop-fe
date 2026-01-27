export const formatDisplayName = (data: {
  first_name?: string | null;
  email?: string;
}) => {
  if (!!data.first_name?.length) return data.first_name;
  if (!!data.email) return data.email;

  return "-";
};
