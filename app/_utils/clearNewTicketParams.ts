export default function clearNewTicketParams(searchParams: URLSearchParams) {
  const params = new URLSearchParams(searchParams);
  params.delete("formData");
  params.delete("newTicketFeedback");
  return params;
}
