package glut.activity.serviceImp;

import glut.activity.dao.AdminDAO;
import glut.activity.service.AdminService;
import glut.db.auto.Activity;
import glut.db.auto.ActivityGroup;

import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("adminServiceImp_act")
public class AdminServiceImp implements AdminService {
	@Resource
	private AdminDAO adminDAO;
	private static Logger logger = Logger.getLogger(AdminServiceImp.class);

	@Override
	public void addActivity(Activity activity,String activityGroupID) throws Exception {
		String actId = createActId();

		logger.info("这里是活动ID:" + actId);
		
		activity.setId(actId);
		activity.setPopulationCurrent(0);
		activity.setStatus("报名中");
		
		if(!activityGroupID.equals("") && activityGroupID!=null){
			ActivityGroup activityGroup = new ActivityGroup();
			activityGroup.setId(Integer.parseInt(activityGroupID));
			activity.setActivityGroup(activityGroup);
		}

		logger.info("！！！这里是服务器处理过后的activity信息！*******" + activity.toString());

		adminDAO.save(activity);
	}

	private String createActId() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		// 创建活动id的前缀(如200701)
		String yyyyMM = sdf.format(Calendar.getInstance().getTime());
		logger.info("这里是yyyy-MM:" + yyyyMM);
		String latestActId = (String) adminDAO.findByArgs("max(id)",
				"Activity", null, null, null, null, false).get(0);
		// 创建活动id的后缀(四位数)默认是0001
		String suffix = "0001";
		// 若activity表为空
		if (latestActId != null) {
			logger.info("这里是latestActId:" + latestActId);
			// 当前缀相同，后缀则要往后+1
			if (yyyyMM.equals(latestActId.substring(0, 6))) {
				int actIdLenth = latestActId.length();
				int oldSuffix_int = Integer.valueOf(latestActId.substring(
						actIdLenth - 4, actIdLenth)) + 1;
				String oldSuffix_str = oldSuffix_int + "";
				suffix = suffix.substring(0, 4 - oldSuffix_str.length())
						+ oldSuffix_str;
			}
		}
		return yyyyMM + suffix;
	}

	@Override
	public List<Activity> findActivityByName(String activityName) {
		// TODO Auto-generated method stub
		//deleted by yattie, 非常繁琐的查询方式
//		List<Object[]> list = adminDAO.findByArgs(
//						"a.id, a.`name`, a.object, a.dead_line, a.activity_time, a.notes,a.`status`, a.population_limit, a.activity_type, a.population_current, a.template, a.act_time, a.act_location",
//						"Activity a", "name like '%" + activityName
//								+ "%' and status!='无效'", null, null, null,
//						true);
//		ArrayList<Activity> activities = new ArrayList<Activity>(list.size());
//
//		for (Object[] objects : list) {
//			Activity tempAct = new Activity();
//
//			tempAct.setId(objects[0] + "");
//			tempAct.setName(objects[1] + "");
//			tempAct.setObject(objects[2] + "");
//			tempAct.setDeadLine((Date) objects[3]);
//			tempAct.setActivityTime((Date) (objects[4]));
//			tempAct.setNotes(objects[5] + "");
//			tempAct.setStatus(objects[6] + "");
//			tempAct.setPopulationLimit((Integer) objects[7]);
//			tempAct.setActivityType(objects[8] + "");
//			tempAct.setPopulationCurrent((Integer) (objects[9]));
//			tempAct.setTemplate(objects[10]+"");
//			tempAct.setActTime((Time)objects[11]);
//			tempAct.setActLocation(objects[12]+"");
//
//			activities.add(tempAct);
//		}
//
//		return activities;
		List<Activity> list = adminDAO.findByArgs(
		null,
		"Activity", 
		"name like '%" + activityName + "%' and status!='无效'", 
		null, null, null,
		false);
		return list;
	}

	@Override
	public Activity findActivityByID(String activityID) {
		// TODO Auto-generated method stub
		List list = adminDAO.findByArgs(null, "Activity", "id='" + activityID
				+ "'", null, null, null, false);
		return (Activity) (list.isEmpty() ? null : list.get(0));
	}

	@Override
	public void updateActivity(List<Activity> activities) throws Exception {
		// TODO Auto-generated method stub
		for (Activity act : activities) {
			adminDAO.update(act);
		}
	}

	@Override
	public void deleteActivity(Activity activity) throws Exception {
		// TODO Auto-generated method stub
		activity.setStatus("无效");
		adminDAO.update(activity);
	}

	@Override
	public List<Activity> getAllActivity() {
		// TODO Auto-generated method stub
		logger.debug("**************getAllActivity**********");

		List<Object[]> list = adminDAO.findByArgs(
						"a.id, a.`name`, a.object, a.dead_line, a.activity_time, a.notes,a.`status`, a.population_limit, a.activity_type, a.population_current, a.template, a.act_time, a.act_location,a.act_customtime",
						"Activity a ", "status!='无效'", null, null, null, true);
		
		ArrayList<Activity> activities = new ArrayList<Activity>(list.size());

		for (Object[] objects : list) {
			Activity tempAct = new Activity();

			tempAct.setId(objects[0] + "");
			tempAct.setName(objects[1] + "");
			tempAct.setObject(objects[2] + "");
			tempAct.setDeadLine((Date) objects[3]);
			tempAct.setActivityTime((Date) (objects[4]));
			tempAct.setNotes(objects[5] + "");
			tempAct.setStatus(objects[6] + "");
			tempAct.setPopulationLimit((Integer) objects[7]);
			tempAct.setActivityType(objects[8] + "");
			tempAct.setPopulationCurrent((Integer) (objects[9]));
			tempAct.setTemplate(objects[10]+"");
			tempAct.setActTime((Time)objects[11]);
			tempAct.setActLocation(objects[12]+"");
			tempAct.setActCustomtime(objects[13]+"");

			activities.add(tempAct);
		}

		return activities;
	}
	
	@Override
	public List getAllActivityGroup() {
		return adminDAO
				.findByArgs(
				null,
				"ActivityGroup",
				null, null, null,
				null, false);
	}
	
	@Override
	public List<Activity> getAllFinishedActivity() {
		// TODO Auto-generated method stub
		List<Object[]> list = adminDAO.findByArgs(
						"a.id, a.`name`, a.object, a.dead_line, a.activity_time, a.notes,a.`status`, a.population_limit, a.activity_type, a.population_current, a.template, a.act_time, a.act_location,a.act_customtime",
						"Activity a ", "status='报名已结束'", null, null, null,
						true);
		
		ArrayList<Activity> activities = new ArrayList<Activity>(list.size());

		for (Object[] objects : list) {
			Activity tempAct = new Activity();

			tempAct.setId(objects[0] + "");
			tempAct.setName(objects[1] + "");
			tempAct.setObject(objects[2] + "");
			tempAct.setDeadLine((Date) objects[3]);
			tempAct.setActivityTime((Date) (objects[4]));
			tempAct.setNotes(objects[5] + "");
			tempAct.setStatus(objects[6] + "");
			tempAct.setPopulationLimit((Integer) objects[7]);
			tempAct.setActivityType(objects[8] + "");
			tempAct.setPopulationCurrent((Integer) (objects[9]));
			tempAct.setTemplate(objects[10]+"");
			tempAct.setActTime((Time)objects[11]);
			tempAct.setActLocation(objects[12]+"");
			tempAct.setActCustomtime(objects[13]+"");

			activities.add(tempAct);
		}

		return activities;
		
		
	}

	@Override
	public List findAllActivityPlayers(String activityId) {
		// TODO Auto-generated method stub
		//deleted by yattie 铲除SQL，维护起来太麻烦
//		return adminDAO
//				.findByArgs(
//						"m.`name`, m.dpm_brief, asu.player_phone, asu.notes, asu.signup_doc ",
//						"activity_sign_up asu JOIN member m ON m.number = asu.player_number JOIN activity a ON asu.activity_id = a.id ",
//						"asu.activity_id='" + activityId + "'", null, null,
//						null, true);
		return adminDAO
				.findByArgs(
				null,
				"ActivitySignUp",
				"activity.id='" + activityId + "'", null, null,
				null, false);
	}
}
