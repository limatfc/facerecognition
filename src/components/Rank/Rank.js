import "./Rank.css";

export default function Rank({ user }) {
  return (
    <div className="rank-wrapper">
      <div className="white f3">{`${user.name}, your current entry count is...`}</div>
      <div className="white f1">{`#${user.entries}`}</div>
    </div>
  );
}
