import BaseAPIService from "@ui/version_3/base_classes/base_api_service";

import { APIResponseInterface } from "@ui/version_3/types/util_type";

import { MemberRecordInterface, PaginatedResponseResultInterface } from "@/types/api_service_type";

import { MemberListFiltersInterface } from "@/types/list_view_filter_type";

class MemberAPIService extends BaseAPIService {
    // =========================
    // 🔹 GET MEMBER LIST (DUMMY)
    // =========================
    public static getMemberList = async (params?: {
        page?: number;
        limit?: number;
        sort_by?: string;
        sort_direction?: string;
        filters?: MemberListFiltersInterface;
    }): Promise<
        APIResponseInterface<PaginatedResponseResultInterface<MemberRecordInterface[]>>
    > => {
        const { page = 0, limit = 12, filters = {} } = params ?? {};

        const allDummyMembers: MemberRecordInterface[] = [
            {
                public_id: "member_01",
                username: "jdoe",
                email: "jdoe@example.com",
                phone: "+1234567890",
                full_name: "John Doe",
                first_name: "John",
                last_name: "Doe",
                dob: "1990-01-01",
                gender: "Male",
                profile_photo_link: "",
                is_active: true,
                is_2fa_enabled: false,
                is_verified: true,
                roles: [],
                is_fully_authenticated: true
            },
            {
                public_id: "member_02",
                username: "asmith",
                email: "asmith@example.com",
                phone: "+1987654321",
                full_name: "Anna Smith",
                first_name: "Anna",
                last_name: "Smith",
                dob: "1992-05-10",
                gender: "Female",
                profile_photo_link: "",
                is_active: true,
                is_2fa_enabled: true,
                is_verified: true,
                roles: [],
                is_fully_authenticated: true
            }
        ];

        const filteredMembers = allDummyMembers.filter((member) => {
            const search = filters.search?.toString()?.trim()?.toLowerCase?.() ?? "";
            if (!search) {
                return true;
            }

            return [member.full_name, member.username, member.email]
                .filter(Boolean)
                .some((value) => value?.toLowerCase().includes(search));
        });

        return {
            status: "success",
            msg: "success",
            data: {
                total_items: filteredMembers.length,
                total_pages: Math.ceil(filteredMembers.length / limit),
                current_page: page,
                records: filteredMembers
            }
        };
    };

    // =========================
    // 🔹 GET SINGLE MEMBER (DUMMY)
    // =========================
    public static getMember = async (
        public_id: string
    ): Promise<APIResponseInterface<MemberRecordInterface>> => {
        const dummyMember: MemberRecordInterface = {
            public_id,
            username: "unknown",
            email: "unknown@example.com",
            phone: "",
            full_name: "Unknown Member",
            first_name: "Unknown",
            last_name: "Member",
            dob: "1970-01-01",
            gender: "Other",
            profile_photo_link: "",
            is_active: false,
            is_2fa_enabled: false,
            is_verified: false,
            roles: [],
            is_fully_authenticated: false
        };

        return {
            status: "success",
            msg: "success",
            data: dummyMember
        };
    };
}

export default MemberAPIService;
