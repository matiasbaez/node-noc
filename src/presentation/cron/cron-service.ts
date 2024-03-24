import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

    static createJob( cronTime: CronTime, onTick: OnTick ): CronJob {
        const job = new CronJob(
            cronTime, //
            onTick, // the callback function to be executed
            null, // an optional parameter to define a time zone (e.g., 'Asia/Tokyo')
            false, // whether or not to run the job in random delay between every schedule
            'America/Asuncion' // optional: specify the timezone for this cron job (default is local)
        );

        job.start();

        return job;
    }

}
