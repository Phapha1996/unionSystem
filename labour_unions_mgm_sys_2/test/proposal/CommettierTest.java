package proposal;

import glut.db.auto.CmtMbAdv4Proposal;
import glut.db.auto.Member;
import glut.db.auto.Proposal;
import glut.member.dao.AdminDAO;
import glut.proposal.dao.UserDAO;
import glut.proposal.service.UserService;
import glut.util.Constants;
import glut.util.SessionPool;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.Session;
import org.junit.Test;

import util.MyTransactionalSpringContextTests;

public class CommettierTest extends MyTransactionalSpringContextTests{
	
	@Resource
	UserService userServiceImp_pro;
	@Resource
	UserDAO userDAO;
	@Resource
	AdminDAO adminDAO;
	

	public CommettierTest(){
	
	}

	public Member getMember(){
		String empNumber = "12306";//账号12306
		String name = "提案委员会";
		String empIDCard = "123";
		Member mb = new Member();
		mb.setName(name);
		mb.setIdCard(empIDCard);
		mb.setNumber(empNumber);
		return mb;
	}
	public Proposal getProposal(){
		Proposal obj=new Proposal();
		/*注意：输入的数据应该与界面上用户看到的数据高度一致
		如：提交时间界面上没有，这里也不需要set*/
		String submitterName="蒋存波";
		String submitterDpm="信息科学与工程学院";
		String submitterPhone="18955454878";
		String supporter1="黄琳";
		String supporter2="李纯纯";
		String category="交通运输";
		String title="提案测试标题1：老师家访；阿狸减肥上了飞机啊；浪费就发生了；放假啊";
		String reason="提案测试案由1：了；啊手机费；拉接啊；上了飞机啊； ；阿加莎；冷风机\nhklasfja;lsadf雷锋精神；";
		String action="提案测试措施1：aljdl吉林省；放假啊家；啊剪短发；放假啊；上飞机啊\n"
				+ "jlfjdl;af啊；神经分裂了就发；；；啊是老地方见啊；老师家访；阿萨德减肥"
				+ "就爱了；斯蒂芬金接啊；楼上的开房间啊；楼上的开房间啊； 发生的；两色风景";
		/*构建VO*/
		obj.setSubmitterName(submitterName);
		obj.setSubmitterDpm(submitterDpm);
		obj.setSubmitterPhone(submitterPhone);
		obj.setSupporter1(supporter1);
		obj.setSupporter2(supporter2);
		obj.setCategory(category);
		obj.setTitle(title);
		obj.setReason(reason);
		obj.setAction(action);
		
		return obj;
	}
	
	@Test
	public void testSubmitProposal() {
		Proposal obj =getProposal();
		try {
			userServiceImp_pro.submitProposal(obj);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//测试是否成功
		List<Proposal> result=userDAO.findProposals("submitterName='蒋存波' and submitterPhone='18955454878'");
		assertNotNull(result.isEmpty() ? null : result.get(0));
	}

	@Test
	public void testUpdateProposal() {
		//fail("Not yet implemented");
		Proposal obj =getProposal();
		List<Proposal> proposals = null;
		List<Proposal> result1 = null;
		List<Proposal> result2 = null;
		String dpmLv = null;
		String mdfAdv = "dsf";
		String proId = null;
		String comment = "这是评论";
		String committeeAdv = "同意立案";//委员会意见
		String mainUnit = "校领导";//主办部门
		String assistantUnit = "党委办公室";//协办部门
		String memo = "这是备注";//备注
		String responseLeader = "这是领导回复";//领导回复
		try {
			userServiceImp_pro.submitProposal(obj);
			obj.setComment(comment);
			//代表的
			dpmLv = "1";
			proposals = userDAO.findProposals("submitterName='蒋存波' and submitterPhone='18955454878'");
			proId = proposals.get(0).getId();
			proposals.clear();
			proposals.add(obj);
			userServiceImp_pro.updateProposal(proposals, dpmLv, mdfAdv, proId);
			result1 = userDAO.findProposals("submitterName='蒋存波' and comment='这是评论'");
			//提案委员会的
			dpmLv = "2";
			obj.setMainUnit(mainUnit);
			obj.setCommitteeAdv(committeeAdv);
			obj.setAssistantUnit(assistantUnit);
			obj.setMemo(memo);
			obj.setResponseLeader(responseLeader);
			proposals.clear();
			proposals.add(obj);
			userServiceImp_pro.updateProposal(proposals, dpmLv, mdfAdv, proId);
			result2 = userDAO.findProposals("submitterName='蒋存波' and mainUnit='"+mainUnit+"' and assistantUnit='"+assistantUnit+"'");
		} catch (Exception e) {
			// TODO: handle exception
		}
		assertNotNull(result1.isEmpty() ? null : result1.get(0));
		assertNotNull(result2.isEmpty() ? null : result2.get(0));
	}


	@Test
	public void testFindProposals4Export() {
		List result = null;
		Map<String, String> params = new HashMap<>();
		int submitDate = Calendar.getInstance().get(Calendar.YEAR);//年份
		Proposal pro = getProposal();
		params.put("title", pro.getTitle());
		params.put("submitDate", submitDate+"");
		params.put("submitterName", pro.getSubmitterName());
		params.put("submitterDpm", pro.getSubmitterDpm());
		params.put("category", pro.getCategory());
		try {
			userServiceImp_pro.submitProposal(pro);
			result = userServiceImp_pro.findProposals4Export(params);
		} catch (Exception e) {
			// TODO: handle exception
		}
		assertNotNull(result.isEmpty() ? null : result);
	}
	
	@Test
	public void testApporveProposalCommon() {
		//
		Member mb = getMember();
		Session session = SessionPool.getCurrentSession();
		List result = null;
		try {
			session.saveOrUpdate(mb);//首先插入一个用户
			session.flush();
			Proposal obj =getProposal();
			userServiceImp_pro.submitProposal(obj);//先插入一条数据
			List<Proposal> list= userDAO.findProposals("submitterName='蒋存波' and submitterPhone='18955454878'");
			String proId = list.get(0).getId();
			String account = mb.getNumber();
			String mainUnit = "财务处";
			String assistantUnit = "教务处";
			String advice = "同意立案";
			userServiceImp_pro.apporveProposalCommon(proId, account, mainUnit, assistantUnit, advice);
			result = userDAO.findByArgs(null, "CmtMbAdv4Proposal", "proposal_id='" + proId + "' AND cmt_mb_id='"+mb.getNumber()+ "'",
					null, null, null, false);
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		assertNotNull("null",result.isEmpty() ? null : result.get(0));
		
	}
	
	@Test
	public void testFindCmtMbAdv() {
		Member mb = getMember();
		Session session = SessionPool.getCurrentSession();
		Proposal obj =getProposal();
		String result = null;
		try {
			session.saveOrUpdate(mb);//首先插入一个用户
			session.flush();
			userServiceImp_pro.submitProposal(obj);
			List<Proposal> list= userDAO.findProposals("submitterName='蒋存波' and submitterPhone='18955454878'");
			String proId = list.get(0).getId();
			String mainUnit = "财务处";
			String assistantUnit = "教务处";
			String advice = "同意立案";
			CmtMbAdv4Proposal cmp = new CmtMbAdv4Proposal();
			cmp.setMember(mb);
			cmp.setProposalId(proId);
			cmp.setCmtMbAdvDpm1st(mainUnit);
			cmp.setCmtMbAdvDpm2nd(assistantUnit);
			cmp.setCmtMbAdv(advice);
			session.saveOrUpdate(cmp);
			
			result = userServiceImp_pro.findCmtMbAdv(proId);
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		assertNotNull("should not be null",result);
	}

	@Test
	public void testLoadSpecifiedProposalsFromDB(){
		List<Proposal> result = null;
		Map<String, String> params = new HashMap<>();
		int submitDate = Calendar.getInstance().get(Calendar.YEAR);//年份
		Proposal pro = getProposal();
		params.put("submit_date", submitDate+"");
		params.put("submitter_name", pro.getSubmitterName());
		params.put("submitter_dpm", pro.getSubmitterDpm());
		params.put("category", pro.getCategory());
		try {
			userServiceImp_pro.submitProposal(pro);
			result = userServiceImp_pro.loadSpecifiedProposalsFromDB(params);//该方法用的是SQL查询，所以字段名字和数据库的一样
		} catch (Exception e) {
			// TODO: handle exception
		}
		assertNotNull(result);
	}

}
