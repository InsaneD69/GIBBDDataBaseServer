import { RequestPostProtocol, RequestProtocol } from "./client_api/request_type"
import { newComplaint, newProtocol } from "./services/models";

export function reqPostProtocolValidator(req: newProtocol): newProtocol {

    const ret: newProtocol = {
        vin: req.vin,
        passport_number: req.passport_number,
        date_of_case: req.date_of_case,
        case_address: req.case_address,
        camera_id: req.camera_id,
        case_reason: req.case_reason,
        case_verdict: req.case_verdict,
        police_id: req.police_id,
        person_name: req.person_name,
        surname: req.surname,
        patronymic: req.patronymic,
        phone_number: req.phone_number,
        job_info: req.job_info,
        date_of_birth: req.date_of_birth,
        unit: req.unit,
        place_of_registr: req.place_of_registr,
        full_name: req.full_name,
        post: req.post,
        rank: req.rank,
        mark_and_model: req.mark_and_model,
        number: req.number,
        region_code: req.region_code,
        articles: req.articles,
        fines: req.fines
    }

    return ret;
}


export function reqPostComplaintValidator(req: newComplaint): newComplaint{

    const ret: newComplaint = {
        case_id: req.case_id,
        passport_number: req.passport_number,
        full_justification: req.full_justification,
        was_a_driver: req.was_a_driver,
        reason_text: req.reason_text
    }

    return ret;
}
