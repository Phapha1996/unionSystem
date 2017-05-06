package glut.proposal.serviceImp;

import glut.activity.action.AdminAction;
import glut.db.auto.CmtMbAdv4Proposal;
import glut.db.auto.Member;
import glut.db.auto.Proposal;
import glut.proposal.dao.UserDAO;
import glut.proposal.service.UserService;
import glut.util.Constants;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("userServiceImp_pro")
public class UserServiceImp implements UserService {
	private UserDAO userDAO;
	private static Logger logger = Logger.getLogger(AdminAction.class);

	private final String AND = " and ";
	private final String LIKE = " like ";

	@Override
	public boolean isSupporter(String name) throws Exception {
		// TODO Auto-generated method stub
		List list = userDAO.findByArgs("number", "member m", "m.name='" + name
				+ "'", null, null, null, true);
		logger.debug("附议人判断~" + list.size());
		return list.isEmpty() ? false : true;
	}

	@Override
	public void submitProposal(Proposal proposal) throws Exception {
		// TODO Auto-generated method stub
		proposal.setNextUnit(2);
		proposal.setId(createActId());
		// proposal.setProgress("正在办理");
		proposal.setSubmitDate(Calendar.getInstance().getTime());
		logger.debug("*******UserServiceImp submitProposal*******");
		logger.debug(proposal.toString());
		userDAO.save(proposal);
	}

	private String createActId() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		// 创建活动id的前缀(如200701)
		String yyyyMM = sdf.format(Calendar.getInstance().getTime());
		logger.info("这里是yyyy-MM:" + yyyyMM);
		List list = userDAO.findByArgs("max(id)", "Proposal", null, null, null,
				null, false);
		String latestActId = (String) (list.isEmpty() ? null : list.get(0));
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
	public void updateProposal(List<Proposal> proposals, String dpmLv,
			String mdfAdv, String proId) throws Exception {
		// TODO Auto-generated method stub
		// 这里的代码可以重用,优化时再调整.
		if ("1".equals(dpmLv)) {
			for (Proposal pro : proposals) {
				List list = userDAO.findByArgs(null, "Proposal",
						"id='" + pro.getId() + "'", null, null, null, false);
				Proposal pps = (Proposal) (list.isEmpty() ? null : list.get(0));
				pps.setComment(pro.getComment());
				userDAO.update(pps);
			}
		} else if ("2".equals(dpmLv)) {
			for (Proposal pro : proposals) {
				List list = userDAO.findByArgs(null, "Proposal",
						"id='" + pro.getId() + "'", null, null, null, false);
				Proposal pps = (Proposal) (list.isEmpty() ? null : list.get(0));

				pps.setCommitteeAdv(pro.getCommitteeAdv());
				pps.setNextUnit(3);
				pps.setMainUnit(pro.getMainUnit());
				pps.setAssistantUnit(pro.getAssistantUnit());
				pps.setMemo(pro.getMemo());
				pps.setResponseLeader(pro.getResponseLeader());
				userDAO.update(pps);
			}
		} else if ("3".equals(dpmLv)) {
			for (Proposal pro : proposals) {
				List list = userDAO.findByArgs(null, "Proposal",
						"id='" + pro.getId() + "'", null, null, null, false);
				Proposal pps = (Proposal) (list.isEmpty() ? null : list.get(0));
				pps.setProgress(pro.getProgress());
				pps.setReplyContent(pro.getReplyContent());
				pps.setNextUnit(4);
				userDAO.update(pps);
			}
		} else if ("4".equals(dpmLv)) {//领导退回部门回复
			List list = userDAO.findByArgs(null, "Proposal", "id='" + proId
					+ "'", null, null, null, false);
			Proposal pps = (Proposal) (list.isEmpty() ? null : list.get(0));
			String preOpnion=pps.getLdOpinion();
			if (preOpnion==null){
				preOpnion="";
			}
			pps.setLdOpinion(preOpnion+new SimpleDateFormat("yyyy-MM-dd HH:mm")
			.format(Calendar.getInstance().getTime())+" : "+mdfAdv+Constants.SEPERATOR_PPS_REPLY);
			//pps.setDpmReply(pps.getDpmReply() + "\n" + mdfAdv);
			/*设置领导新回复标志，并且重置部门新回复标志*/
			pps.setLdOpinionFlag(Constants.NEWREPLY_PPS_REPLY);
			pps.setDpmReplyFlag("");
			logger.debug("被回退的回复:" + pps.getDpmReply());
			userDAO.update(pps);
		}

	}

	@Override
	public void comment(Proposal proposal) throws Exception {
		// TODO Auto-generated method stub
		userDAO.save(proposal);
	}

	@Override
	public void feedBack(Proposal proposal) throws Exception {
		// TODO Auto-generated method stub
		userDAO.save(proposal);
	}

	@Override
	public List findProposals(String whereArgs) throws Exception {

		return userDAO.findProposals(whereArgs);
	}

	@Override
	public String findCmtMbAdv(String proId) throws Exception {
		List<Object[]> list = userDAO
				.findByArgs(
						"cmt.id,m.`name`,cmt.cmt_mb_adv,cmt.cmt_mb_adv_dpm_1st,cmt.cmt_mb_adv_dpm_2nd",
						"cmt_mb_adv_4_proposal cmt join member m ON cmt.cmt_mb_id=m.number",
						"cmt.proposal_id='" + proId + "'", null, null, null,
						true);
		int total = list.size();
		StringBuilder sb = new StringBuilder("[");

		for (Object[] objects : list) {
			StringBuilder tmpStr = new StringBuilder("{");

			tmpStr.append("'id':'" + objects[0] + "',");
			tmpStr.append("'cmt_mb_name':'" + objects[1] + "',");
			tmpStr.append("'cmt_mb_adv':'" + objects[2] + "',");
			tmpStr.append("'cmt_mb_adv_dpm_1st':'" + objects[3] + "',");
			tmpStr.append("'cmt_mb_adv_dpm_2nd':'" + objects[4] + "',");

			sb.append(tmpStr.deleteCharAt(tmpStr.length() - 1) + "},");
		}

		sb.deleteCharAt(sb.length() - 1).append("]");
		String json = "{totalProperty:" + total + ",root:" + sb.toString()
				+ "}";
		return json;
	}

	@Override
	public List findProposals4Export(Map<String, String> params)
			throws Exception {
		StringBuilder whereArgs = new StringBuilder("1=1");
		Set<Entry<String, String>> entrySet = params.entrySet();
		for (Entry<String, String> entry : entrySet) {
			if ("submitDate".equals(entry.getKey())) {
				int year = Integer.parseInt(entry.getValue());
				String submitDate = entry.getKey();
				whereArgs.append(AND + submitDate + ">='" + year + "'" + AND
						+ submitDate + "<='" + (year + 1) + "'");
			} else if ("submitterName".equals(entry.getKey())) {
				whereArgs.append(AND + entry.getKey() + LIKE + "'%"
						+ entry.getValue() + "%'");
			} else if ("title".equals(entry.getKey())) {
				whereArgs.append(AND + entry.getKey() + LIKE + "'%"
						+ entry.getValue() + "%'");
			} else {
				whereArgs.append(AND + entry.getKey() + "='" + entry.getValue()
						+ "'");
			}
		}
		return userDAO.findByArgs(null, "Proposal", whereArgs.toString(), null,
				null, null, false);
	}

	// 提案委员会功能
	@Override
	public void apporveProposal(Proposal proposal) throws Exception {
		// TODO Auto-generated method stub
		userDAO.save(proposal);
	}

	@Override
	public void apporveProposalCommon(String proId, String account,
			String mainUnit, String assistantUnit, String advice)
			throws Exception {
		// TODO Auto-generated method stub
		List list = userDAO.findByArgs(null, "Member", "number=" + account,
				null, null, null, false);
		Member mb = (Member) (list.isEmpty() ? null : list.get(0));

		userDAO.save(new CmtMbAdv4Proposal(mb, advice, mainUnit, assistantUnit,
				proId));
	}

	// 相关部门、校领导回复
	@Override
	public void reply(String dpmLv, String replyContent, String proId)
			throws Exception {
		// TODO Auto-generated method stub
		List list = userDAO.findByArgs(null, "Proposal", "id='" + proId + "'",
				null, null, null, false);
		Proposal pps = (Proposal) (list.isEmpty() ? null : list.get(0));
		// 如果是部门发来的回复,要先存放在dpmReply中,先让校领导审批过后才能放入replyContent
		if ("3".equals(dpmLv)) {
			pps.setDpmReply(replyContent);
			/*a by yattie 设置新回复标志，并且重置领导和代表新回复标志位*/
			pps.setDpmReplyFlag(Constants.NEWREPLY_PPS_REPLY);
			pps.setLdOpinionFlag("");
			/*只有当代表有新回复时才需重置*/
			if (Constants.NEWREPLY_PPS_REPLY.equals(pps.getDlgReplyFlag())){
				pps.setDlgReplyFlag("");				
			}

			// 回复后,为了让领导能看见,要将nextUnit设为4,4即是校领导的级别.
			pps.setNextUnit(4);
		} else {
			String content = pps.getReplyContent() == null ? "" : pps
					.getReplyContent();
			/*代表回复*/
			if ("1".equals(dpmLv)) {
				content += new SimpleDateFormat("yyyy-MM-dd HH:mm")
								.format(Calendar.getInstance().getTime()) + " #" +"提案代表"+"# "
						+ replyContent + Constants.SEPERATOR_PPS_REPLY;
				/*设置代表新回复标志*/
				pps.setDlgReplyFlag(Constants.NEWREPLY_PPS_REPLY);
			/* 校领导审批通过
			 * 相关部门回复的内容时间为校领导审批的时间.*/
			} else if ("4".equals(dpmLv)) {
				content += new SimpleDateFormat("yyyy-MM-dd HH:mm")
								.format(Calendar.getInstance().getTime()) + " #" +"负责部门"+"# "
						+ replyContent + Constants.SEPERATOR_PPS_REPLY;
				// 校领导审核通过后,dpmReply中的内容将被清空
				pps.setDpmReply("");
				/*a by yattie 重置部门新回复标志，设置审核通过后新回复标志位*/
				pps.setDpmReplyFlag("");
				pps.setDlgReplyFlag(Constants.NEW_PASSED_REPLY_PPS);
				
			}
			logger.debug("这里是回复内容:" + content + ",+++" + replyContent);
			pps.setReplyContent(content);
		}
		userDAO.update(pps);
	}

	/**
	 * @author xupk 20151221
	 * */
	@Override
	public List loadExcelFromDB() {
		return userDAO
				.findByArgs(
						"id,submit_date,submitter_dpm,submitter_name,submitter_phone,supporter1,supporter2,category,title,reason,action,committee_adv,main_unit,assistant_unit",
						"proposal", null, null, "category", null, true);
	}

	@Override
	public List loadSpecifiedProposalsFromDB(Map<String, String> params) {
		StringBuilder whereArgs = new StringBuilder("1=1");
		Set<Entry<String, String>> entrySet = params.entrySet();
		for (Entry<String, String> entry : entrySet) {
			if ("submit_date".equals(entry.getKey())) {
				int year = Integer.parseInt(entry.getValue());
				String submitDate = entry.getKey();
				whereArgs.append(AND + submitDate + ">='" + year + "'" + AND
						+ submitDate + "<='" + (year + 1) + "'");
			} else {
				whereArgs.append(AND + entry.getKey() + "='" + entry.getValue()
						+ "'");
			}
		}
		return userDAO
				.findByArgs(
						"id,submit_date,submitter_dpm,submitter_name,submitter_phone,supporter1,supporter2,category,title,reason,action,committee_adv,main_unit,assistant_unit",
						"proposal", whereArgs.toString(), null, "category",
						null, true);
	}

	public UserDAO getUserDAO() {
		return userDAO;
	}

	@Resource(name = "userDAOImp_pro")
	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

}
