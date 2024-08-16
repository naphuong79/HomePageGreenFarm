import { Button } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
function Profile() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    
      <div className=" w-full border border-[#a0a0a0] p-5">
        {/* {Infor} */}
        <div>
          <h1 className="text-xl">Thông tin</h1>
          <form className="" action="">
            <div className="mt-5">
              <label>Họ Tên</label>
              <Input placeholder="FullName" value={auth?.currentUser?.fullname} disabled/>
            </div>
            <div className="mt-5">
              <label>Email</label>
              <Input placeholder="Email" value={auth?.currentUser?.email} disabled/>
            </div>
          </form>
        </div>
        
        {/* {Button Save} */}
        {/* <div className="pt-6">
          <Button className="bg-[#87b106]">Lưu</Button>
        </div> */}
      </div>
    
  );
}

export default Profile;
