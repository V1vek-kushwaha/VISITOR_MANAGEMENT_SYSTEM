function SplitFullName(fullName) {
  const parts = fullName?.trim()?.split(" ");

  const firstName = parts[0] || "";
  const lastName = parts?.slice(1)?.join(" ") || "";

  return { firstName, lastName };
}

export default SplitFullName;