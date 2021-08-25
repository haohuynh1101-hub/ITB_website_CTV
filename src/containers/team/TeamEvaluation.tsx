/* eslint-disable prettier/prettier */
import { Avatar, EyeIcon, FormItem, Tabs } from 'components';
import { Evaluate, EvaluateEditor } from 'components/evaluation';
import { EVALUATE_INTERVAL_TABS } from 'containers/team/constant';
import { useState } from 'react';

export const TeamEvaluationContainer = () => {
    const [tab, setTab] = useState<'ROUND_1' | 'ROUND_2' | 'ROUND_3'>('ROUND_1');

    const handleTabChange = (tab: 'ROUND_1' | 'ROUND_2' | 'ROUND_3') => {
        setTab(tab);
    };
    return (
        <div className="py-4 grid grid-cols-12 gap-4">
            <div className="col-span-4">
                <div className="p-4 border space-y-4 rounded-md">
                    <div className="text-base font-medium">
                        <h4>Tên nhóm:</h4>
                    </div>

                    <div className="border-b border-dashed"></div>

                    <div className=" space-y-2 ">
                        <div className="text-base font-medium">
                            <h4>Người hỗ trợ</h4>
                        </div>

                        <div className="space-y-2">
                            <div className="flex space-x-2">
                                <Avatar src="" fullName="TT" />
                                <span className="flex-1">Thuan Nguyen</span>
                            </div>
                            <div className="flex space-x-2">
                                <Avatar src="" fullName="TT" />
                                <span className="flex-1">Thuan Nguyen</span>
                            </div>
                        </div>

                    </div>

                    <div className="border-b border-dashed"></div>

                    <div className="space-y-2">
                        <div className="text-base font-medium">
                            <h4>Thành viên</h4>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Nguyen Van A</span>
                                <EyeIcon />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="col-span-8">
                <FormItem>
                    <Tabs
                        tabs={EVALUATE_INTERVAL_TABS}
                        onChange={handleTabChange}
                        activeKey={tab}
                    />
                </FormItem>

                <FormItem>
                    <Evaluate />
                </FormItem>

                <div className="w-full mb-4">
                    <EvaluateEditor
                        placeholder="Nhận xét ..."
                        onChangeEditor={() => console.log()}
                        index={1}
                    />
                </div>
            </div>
        </div>
    );
};
