/* eslint-disable prettier/prettier */
import { AddressIcon, CardIcon, FacebookIcon, PhoneIcon } from '@/components';
import { Avatar, Button } from '@/components/elements';
import { getColorFromText } from '@/components/elements/avatar/utils';
import { ICandidate } from '@/redux/reducers/candidate/type';

import { ContactItem } from '../contact-item';

type IProps = {
  user: ICandidate;
};
export const Profile: React.FC<IProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center w-full space-y-2 col-span-3">
      <Avatar
        src={user?.avatar}
        fullName={user?.fullName}
        className="!w-28 !h-28 !rounded-md"
      />

      <div className="w-full space-y-2">
        <div className="text-base font-medium text-center">
          <span>{user?.fullName}</span>
        </div>

        <div className="text-center">
          <span>{user?.email}</span>
        </div>

        <div className="p-4 bg-white border rounded-md space-y-3">
          <h4 className="mb-2 text-base font-medium">Giới thiệu</h4>

          <div className="space-y-2">
            <ContactItem
              type="TEXT"
              icon={<AddressIcon />}
              content={user?.address}
            />
            <ContactItem
              type="PHONE"
              icon={<PhoneIcon />}
              content={user?.phone}
            />
            <ContactItem
              type="TEXT"
              icon={<CardIcon />}
              content={user?.studentId}
            />
            <ContactItem
              type="TEXT"
              icon={<FacebookIcon />}
              content={user?.linkFB}
            />
          </div>

          <h4 className="mb-2 text-base font-medium space-y-2">
            Ban ứng tuyển
          </h4>
          {user?.department.map((team, index) => (
            <div key={index} className="flex items-center">
              <span className="flex items-center justify-center w-6 mr-2">
                <span
                  className="flex w-2 h-2 bg-red-400 rounded-full"
                  style={{
                    backgroundColor: getColorFromText(
                      team?.trim()?.slice(0, 1)?.toUpperCase() ?? 'T'
                    ),
                  }}
                />
              </span>
              <span className="flex-1">{team}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center w-1/2">
          <Button title="Xem Form" type="primary" onClick={null} />
        </div>
      </div>
    </div>
  );
};
