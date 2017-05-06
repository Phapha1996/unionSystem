package glut.proposal.service;

import glut.db.auto.Proposal;

import java.util.List;

public interface UserService_Stat extends UserService{
	String getStatictis();

	List loadDataFromDB(String fields);

	List getCountNum();
}
