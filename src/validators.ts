import { RequestPostComplaint, RequestPostProtocol, RequestProtocol, RequestUpdateComplaint } from "./client_api/models/request_models"
import { answerOnComplaint, newComplaint, newProtocol } from "./client_api/models/response_models";

export function reqPostProtocolValidator(req: RequestPostProtocol): newProtocol {

    const ret: newProtocol = {
        vin: req.body.vin,
        passport_number: req.body.passport_number,
        date_of_case: req.body.date_of_case,
        case_address: req.body.case_address,
        camera_id: req.body.camera_id,
        case_reason: req.body.case_reason,
        case_verdict: req.body.case_verdict,
        police_id: req.body.police_id,
        person_name: req.body.person_name,
        surname: req.body.surname,
        patronymic: req.body.patronymic,
        phone_number: req.body.phone_number,
        job_info: req.body.job_info,
        date_of_birth: req.body.date_of_birth,
        unit: req.body.unit,
        place_of_registr: req.body.place_of_registr,
        full_name: req.body.full_name,
        post: req.body.post,
        rank: req.body.rank,
        mark_and_model: req.body.mark_and_model,
        number: req.body.number,
        region_code: req.body.region_code,
        articles: req.body.articles,
        fines: req.body.fines
    }

    return ret;
}


export function reqPostComplaintValidator(req: RequestPostComplaint): newComplaint{

    const ret: newComplaint = {
        case_id: req.body.case_id,
        passport_number: req.body.passport_number,
        full_justification: req.body.full_justification,
        was_a_driver: req.body.was_a_driver,
        reason_text: req.body.reason_text
    }

    return ret;
}



export function reqUpdateComplaintValidator(req:RequestUpdateComplaint): answerOnComplaint{

    const ret: answerOnComplaint = {
        complaint_id: req.body.complaint_id,
        verdict: req.body.verdict,
        verdict_boolean: req.body.verdict_boolean
    }

    return ret;
}
