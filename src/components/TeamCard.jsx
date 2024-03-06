export default function TeamCard({ teamInfo }) {
  return (
    <div className="bg-[#DDA15E] p-2 hover:bg-blue-600">
      <img src={teamInfo.strTeamBadge} alt="" />
    </div>
  );
}
